import { StringInputProps } from 'sanity'
import { AutocompleteInput } from './AutocompleteInput'

export function TypeInput(props: StringInputProps) {
    return <AutocompleteInput inputType="type" {...props} />
}