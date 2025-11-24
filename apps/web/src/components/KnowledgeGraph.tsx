'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import * as d3 from 'd3'
import { useRouter } from 'next/navigation'
import { getDynamicOptions, getDomainColor, getLevelColor, formatDisplayName } from '@/lib/dynamicColors'
import { GlossaryModal } from './GlossaryModal'
import { CustomSelect } from './ui/CustomSelect'

interface GraphNode {
  id: string
  term: string
  slug: string
  shortDefinition: string
  level: 'beginner' | 'intermediate' | 'advanced'
  domain: string
  type?: string
  image?: {
    asset: {
      _id: string
      url: string
    }
    alt?: string
  }
  tags?: string[]
  tutorialArticle?: {
    title: string
    slug: { current: string }
  }
  relatedCount?: number
  x?: number
  y?: number
  fx?: number | null
  fy?: number | null
}

interface GraphLink {
  source: string | GraphNode
  target: string | GraphNode
  type: 'prerequisite' | 'related' | 'next'
}

interface KnowledgeGraphProps {
  terms: Array<{
    _id: string
    term: string
    slug: { current: string }
    shortDefinition: string
    level: 'beginner' | 'intermediate' | 'advanced'
    domain: string
    type?: string
    image?: {
      asset: {
        _id: string
        url: string
      }
      alt?: string
    }
    tags?: string[]
    tutorialArticle?: {
      title: string
      slug: { current: string }
    }
    prerequisites?: Array<{ _id: string; term: string; slug: { current: string }; level: string; domain: string }>
    relatedTerms?: Array<{ _id: string; term: string; slug: { current: string }; level: string; domain: string }>
    nextConcepts?: Array<{ _id: string; term: string; slug: { current: string }; level: string; domain: string }>
  }>
}

// Dynamic options and colors - computed from actual data
const useDynamicOptions = (terms: KnowledgeGraphProps['terms']) => {
  return useMemo(() => getDynamicOptions(terms), [terms])
}

export default function KnowledgeGraph({ terms }: KnowledgeGraphProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const router = useRouter()
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null)
  const [selectedNodeRect, setSelectedNodeRect] = useState<DOMRect | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterLevel, setFilterLevel] = useState<string>('all')
  const [filterDomain, setFilterDomain] = useState<string>('all')

  // Detect mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && selectedNode) {
        setSelectedNode(null)
        setSelectedNodeRect(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [!!selectedNode]) // Use boolean instead of object to avoid reference changes

  // Get dynamic options and colors from actual data
  const { domains, types, levels, domainColors } = useDynamicOptions(terms)

  // Convert GraphNode to GlossaryModal term format
  const convertNodeToTerm = (node: GraphNode) => {
    return {
      _id: node.id,
      term: node.term,
      slug: { current: node.slug },
      shortDefinition: node.shortDefinition,
      level: node.level,
      domain: node.domain,
      type: node.type || 'concept',
      image: node.image,
      tags: node.tags,
      relatedCount: node.relatedCount,
      tutorialArticle: node.tutorialArticle
    }
  }

  useEffect(() => {
    if (!svgRef.current || !terms.length) return

    // Clear previous graph
    d3.select(svgRef.current).selectAll('*').remove()

    // Process data
    const nodes: GraphNode[] = terms
      .filter(term => {
        const matchesSearch = searchTerm === '' ||
          term.term.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesLevel = filterLevel === 'all' || term.level === filterLevel
        const matchesDomain = filterDomain === 'all' || term.domain === filterDomain
        return matchesSearch && matchesLevel && matchesDomain
      })
      .map(term => ({
        id: term._id,
        term: term.term,
        slug: term.slug.current,
        shortDefinition: term.shortDefinition,
        level: term.level,
        domain: term.domain,
        type: term.type,
        image: term.image,
        tags: term.tags,
        tutorialArticle: term.tutorialArticle,
        relatedCount: term.relatedTerms?.length
      }))

    const links: GraphLink[] = []

    // Create links from relationships
    const nodeIds = new Set(nodes.map(n => n.id))

    terms.forEach(term => {
      if (!nodeIds.has(term._id)) return

      // Prerequisites (arrow points TO current term FROM prerequisite)
      term.prerequisites?.forEach(prereq => {
        if (nodeIds.has(prereq._id)) {
          links.push({
            source: prereq._id,
            target: term._id,
            type: 'prerequisite'
          })
        }
      })

      // Related terms (bidirectional, no arrows)
      term.relatedTerms?.forEach(related => {
        if (nodeIds.has(related._id)) {
          // Avoid duplicate links by only creating if source ID < target ID
          if (term._id < related._id) {
            links.push({
              source: term._id,
              target: related._id,
              type: 'related'
            })
          }
        }
      })

      // Next concepts (arrow points FROM current term TO next concept)
      term.nextConcepts?.forEach(next => {
        if (nodeIds.has(next._id)) {
          links.push({
            source: term._id,
            target: next._id,
            type: 'next'
          })
        }
      })
    })

    console.log(`Knowledge Graph: ${nodes.length} nodes, ${links.length} links`)

    if (nodes.length === 0) return

    // Set up dimensions
    const container = svgRef.current.parentElement!
    const width = container.clientWidth
    const height = Math.max(600, container.clientHeight)

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)

    // Create zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 4])
      .on('zoom', (event) => {
        g.attr('transform', event.transform)
      })

    svg.call(zoom)

    // Close modal when clicking on background
    svg.on('click', () => {
      setSelectedNode(null)
      setSelectedNodeRect(null)
    })

    // Create main group for zooming/panning
    const g = svg.append('g')

    // Create arrow markers for directed edges
    svg.append('defs').selectAll('marker')
      .data(['prerequisite', 'next'])
      .enter().append('marker')
      .attr('id', d => `arrow-${d}`)
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 20)
      .attr('refY', 0)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5')
      .attr('fill', d => d === 'prerequisite' ? '#6b7280' : '#3b82f6')

    // Create force simulation
    const simulation = d3.forceSimulation<GraphNode>(nodes)
      .force('link', d3.forceLink<GraphNode, GraphLink>(links)
        .id(d => d.id)
        .distance(100)
        .strength(0.5))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(30))

    // Create links
    const link = g.append('g')
      .selectAll('line')
      .data(links)
      .enter().append('line')
      .attr('stroke', d => {
        switch (d.type) {
          case 'prerequisite': return '#6b7280'
          case 'related': return '#10b981'
          case 'next': return '#3b82f6'
          default: return '#9ca3af'
        }
      })
      .attr('stroke-width', 2)
      .attr('stroke-opacity', 0.6)
      .attr('marker-end', d => d.type !== 'related' ? `url(#arrow-${d.type})` : null)

    // Create nodes
    const node = g.append('g')
      .selectAll('g')
      .data(nodes)
      .enter().append('g')
      .style('cursor', 'pointer')
      .call(d3.drag<SVGGElement, GraphNode>()
        .on('start', (event, d) => {
          if (!event.active) simulation.alphaTarget(0.3).restart()
          d.fx = d.x
          d.fy = d.y
        })
        .on('drag', (event, d) => {
          d.fx = event.x
          d.fy = event.y
        })
        .on('end', (event, d) => {
          if (!event.active) simulation.alphaTarget(0)
          d.fx = null
          d.fy = null
        }))

    // Add circles to nodes
    node.append('circle')
      .attr('r', 15)
      .attr('fill', d => getDomainColor(d.domain))
      .attr('stroke', d => getLevelColor(d.level))
      .attr('stroke-width', 3)
      .attr('opacity', 0.8)

    // Add labels to nodes
    node.append('text')
      .text(d => d.term)
      .attr('x', 0)
      .attr('y', -20)
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('font-weight', 'bold')
      .attr('fill', '#1f2937')

    // Add click handlers
    node.on('click', (event, d) => {
      event.stopPropagation()

      // Get the node element's bounding rect for positioning
      const nodeElement = event.currentTarget as SVGGElement
      const rect = nodeElement.getBoundingClientRect()

      // Create a slightly larger rect for better modal positioning
      const adjustedRect = new DOMRect(
        rect.x - 10, // Add some padding
        rect.y - 10,
        rect.width + 20,
        rect.height + 20
      )

      setSelectedNode(d)
      setSelectedNodeRect(adjustedRect)
    })

    node.on('dblclick', (event, d) => {
      router.push(`/glossary/${d.slug}`)
    })

    // Add hover effects
    node.on('mouseenter', function (event, d) {
      // Make cursor pointer
      d3.select(this).style('cursor', 'pointer')

      // Enlarge node
      d3.select(this).select('circle')
        .transition()
        .duration(200)
        .attr('r', 20)
        .attr('opacity', 1)
        .attr('stroke-width', 4)

      // Highlight connected links and nodes
      const connectedNodeIds = new Set<string>()

      link.attr('stroke-opacity', l => {
        const isConnected = (l.source as GraphNode).id === d.id || (l.target as GraphNode).id === d.id
        if (isConnected) {
          connectedNodeIds.add((l.source as GraphNode).id)
          connectedNodeIds.add((l.target as GraphNode).id)
        }
        return isConnected ? 1 : 0.1
      }).attr('stroke-width', l =>
        (l.source as GraphNode).id === d.id || (l.target as GraphNode).id === d.id ? 3 : 2
      )

      // Dim unconnected nodes
      node.select('circle').attr('opacity', n =>
        connectedNodeIds.has(n.id) ? 1 : 0.3
      )
      node.select('text').attr('opacity', n =>
        connectedNodeIds.has(n.id) ? 1 : 0.3
      )
    })

    node.on('mouseleave', function () {
      // Reset node size
      d3.select(this).select('circle')
        .transition()
        .duration(200)
        .attr('r', 15)
        .attr('opacity', 0.8)
        .attr('stroke-width', 3)

      // Reset all links and nodes
      link.attr('stroke-opacity', 0.6).attr('stroke-width', 2)
      node.select('circle').attr('opacity', 0.8)
      node.select('text').attr('opacity', 1)
    })

    // Update positions on simulation tick
    simulation.on('tick', () => {
      link
        .attr('x1', d => (d.source as GraphNode).x!)
        .attr('y1', d => (d.source as GraphNode).y!)
        .attr('x2', d => (d.target as GraphNode).x!)
        .attr('y2', d => (d.target as GraphNode).y!)

      node.attr('transform', d => `translate(${d.x},${d.y})`)
    })

    // Cleanup
    return () => {
      simulation.stop()
    }
  }, [terms, searchTerm, filterLevel, filterDomain, router])

  // Remove this line as we now use dynamic domains

  return (
    <div className="w-full h-full flex flex-col">
      {/* Controls */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
              </svg>
              <h3 className="text-lg font-semibold text-gray-900">Filter Graph</h3>
            </div>

            {(searchTerm !== '' || filterLevel !== 'all' || filterDomain !== 'all') && (
              <button
                onClick={() => {
                  setSearchTerm('')
                  setFilterLevel('all')
                  setFilterDomain('all')
                }}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium cursor-pointer transition-colors"
              >
                Clear All
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search terms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg bg-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <CustomSelect
              value={filterLevel}
              onChange={setFilterLevel}
              options={[
                { value: 'all', label: 'All Levels' },
                { value: 'beginner', label: 'Beginner' },
                { value: 'intermediate', label: 'Intermediate' },
                { value: 'advanced', label: 'Advanced' }
              ]}
              placeholder="Select difficulty level"
            />

            <CustomSelect
              value={filterDomain}
              onChange={setFilterDomain}
              options={[
                { value: 'all', label: 'All Domains' },
                ...domains.map(domain => ({
                  value: domain,
                  label: formatDisplayName(domain)
                }))
              ]}
              placeholder="Select domain"
            />
          </div>

          <div className="flex items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <div className="w-3 h-0.5 bg-gray-500"></div>
              <span>Prerequisites</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-0.5 bg-green-500"></div>
              <span>Related</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-0.5 bg-blue-500"></div>
              <span>Next</span>
            </div>
          </div>
        </div>
      </div>

      {/* Graph Container */}
      <div className="flex-1 relative">
        {terms.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="text-6xl mb-4">🕸️</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Terms Available</h3>
              <p className="text-gray-600">Add some glossary terms in Sanity Studio to see the knowledge graph.</p>
            </div>
          </div>
        ) : (
          <svg ref={svgRef} className="w-full h-full" />
        )}

        {/* Unified Glossary Modal */}
        <GlossaryModal
          term={selectedNode ? convertNodeToTerm(selectedNode) : null}
          variant={isMobile ? 'mobile' : 'desktop'}
          triggerRect={selectedNodeRect}
          isVisible={!!selectedNode}
          onClose={() => {
            setSelectedNode(null)
            setSelectedNodeRect(null)
          }}
        />

        {/* Instructions & Stats */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 text-sm text-gray-600">
          <p><strong>Instructions:</strong></p>
          <p>• Click to select a node</p>
          <p>• Double-click to view details</p>
          <p>• Drag to move nodes</p>
          <p>• Scroll to zoom</p>
          <div className="mt-2 pt-2 border-t border-gray-200">
            <p><strong>Graph Stats:</strong></p>
            <p>• {terms.filter(t => {
              const matchesSearch = searchTerm === '' ||
                t.term.toLowerCase().includes(searchTerm.toLowerCase())
              const matchesLevel = filterLevel === 'all' || t.level === filterLevel
              const matchesDomain = filterDomain === 'all' || t.domain === filterDomain
              return matchesSearch && matchesLevel && matchesDomain
            }).length} nodes visible</p>
            <p>• {terms.reduce((acc, t) =>
              acc + (t.prerequisites?.length || 0) + (t.relatedTerms?.length || 0) + (t.nextConcepts?.length || 0), 0
            )} total relationships</p>
          </div>
        </div>
      </div>
    </div>
  )
}