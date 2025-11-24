import { StringInputProps } from 'sanity'
import { AutocompleteInput } from './AutocompleteInput'

export function DomainInput(props: StringInputProps) {
  return <AutocompleteInput inputType="domain" {...props} />
}