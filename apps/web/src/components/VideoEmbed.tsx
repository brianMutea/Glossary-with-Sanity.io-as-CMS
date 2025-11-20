'use client'

import { memo, useMemo } from 'react'

interface VideoEmbedProps {
  url: string
  title?: string
  caption?: string
}

export const VideoEmbed = memo(function VideoEmbed({ url, title, caption }: VideoEmbedProps) {

  // Memoize video info extraction for performance
  const videoInfo = useMemo(() => {
    const getVideoInfo = (url: string) => {
    // YouTube patterns (including shorts)
    const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=|shorts\/)|youtu\.be\/)([^"&?\/\s]{11})/
    const youtubeMatch = url.match(youtubeRegex)
    
    if (youtubeMatch) {
      return {
        platform: 'youtube',
        id: youtubeMatch[1],
        embedUrl: `https://www.youtube.com/embed/${youtubeMatch[1]}?rel=0&modestbranding=1&color=white&showinfo=0`,
        thumbnailUrl: `https://img.youtube.com/vi/${youtubeMatch[1]}/maxresdefault.jpg`
      }
    }

    // Vimeo patterns
    const vimeoRegex = /(?:vimeo\.com\/)([0-9]+)/
    const vimeoMatch = url.match(vimeoRegex)
    
    if (vimeoMatch) {
      return {
        platform: 'vimeo',
        id: vimeoMatch[1],
        embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}?byline=0&portrait=0&color=6366f1`,
        thumbnailUrl: null // Vimeo thumbnails require API call
      }
    }

    // Loom patterns
    const loomRegex = /(?:loom\.com\/share\/)([a-zA-Z0-9]+)/
    const loomMatch = url.match(loomRegex)
    
    if (loomMatch) {
      return {
        platform: 'loom',
        id: loomMatch[1],
        embedUrl: `https://www.loom.com/embed/${loomMatch[1]}`,
        thumbnailUrl: null
      }
    }

    // Twitch patterns
    const twitchRegex = /(?:twitch\.tv\/videos\/)([0-9]+)/
    const twitchMatch = url.match(twitchRegex)
    
    if (twitchMatch) {
      return {
        platform: 'twitch',
        id: twitchMatch[1],
        embedUrl: `https://player.twitch.tv/?video=${twitchMatch[1]}&parent=${typeof window !== 'undefined' ? window.location.hostname : 'localhost'}`,
        thumbnailUrl: null
      }
    }

    return null
  }
    
    return getVideoInfo(url)
  }, [url])

  if (!videoInfo) {
    return (
      <div className="my-8 p-6 bg-red-50 border border-red-200 rounded-lg">
        <div className="flex items-start gap-3">
          <div className="text-red-500 text-xl">⚠️</div>
          <div>
            <p className="text-red-700 font-medium">Invalid video URL</p>
            <p className="text-red-600 text-sm mt-1">
              Supported platforms: YouTube, Vimeo, Loom, Twitch
            </p>
            <p className="text-red-600 text-sm font-mono bg-red-100 px-2 py-1 rounded mt-2 break-all">
              {url}
            </p>
          </div>
        </div>
      </div>
    )
  }

  const platformIcons = {
    youtube: '📺',
    vimeo: '🎬',
    loom: '🎥',
    twitch: '🟣'
  }

  const platformColors = {
    youtube: 'bg-red-100 text-red-700 border-red-200',
    vimeo: 'bg-blue-100 text-blue-700 border-blue-200',
    loom: 'bg-purple-100 text-purple-700 border-purple-200',
    twitch: 'bg-purple-100 text-purple-700 border-purple-200'
  }

  return (
    <div className="my-8">
      {/* Video Title */}
      {title && (
        <h3 className="text-lg font-semibold text-gray-900 mb-3 text-center">
          {title}
        </h3>
      )}

      {/* Video Container */}
      <div className="relative w-full bg-gray-100 rounded-xl overflow-hidden shadow-lg">
        <div className="relative w-full" style={{ paddingBottom: '56.25%' /* 16:9 aspect ratio */ }}>
          <iframe
            src={videoInfo.embedUrl}
            title={title || `${videoInfo.platform} video`}
            className="absolute top-0 left-0 w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen

          />
        </div>
      </div>
      
      {/* Caption */}
      {caption && (
        <p className="text-center text-gray-600 text-sm mt-4 italic max-w-2xl mx-auto">
          {caption}
        </p>
      )}
      
      {/* Platform indicator and actions */}
      <div className="flex items-center justify-between mt-4">
        <span className={`inline-flex items-center gap-2 px-3 py-1 text-xs font-medium rounded-full border ${platformColors[videoInfo.platform as keyof typeof platformColors]}`}>
          <span>{platformIcons[videoInfo.platform as keyof typeof platformIcons]}</span>
          <span className="capitalize">{videoInfo.platform}</span>
        </span>
        
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 px-3 py-1 text-xs text-gray-600 hover:text-gray-800 transition-colors"
        >
          <span>🔗</span>
          <span>Watch on {videoInfo.platform}</span>
        </a>
      </div>
    </div>
  )
})