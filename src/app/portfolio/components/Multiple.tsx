'use client'

import { MouseEventHandler, useState } from 'react'
import { MultiSelect, Option } from 'react-multi-select-component'
import { Checkbox } from '@nextui-org/react'

import styles from './multiple.module.css'

const options: Option[] = [
  { label: 'all', value: 'all' },
  // { label: 'Mango 🥭', value: 'mango' },
  // { label: 'Strawberry 🍓', value: 'strawberry' },
  // { label: 'Strawberr2 🍓', value: 'strawberry2' },
  // { label: 'Strawberry3 🍓', value: 'strawberry3' },
]

interface Item {
  option: {
    label: string
    value: string
  }
  checked: boolean
  onClick: MouseEventHandler<HTMLInputElement>
}

interface IDefaultItemRendererProps {
  checked: boolean
  option: {
    label: string
    value: string
    key?: string
    disabled?: boolean
  }
  disabled?: boolean
  onClick: MouseEventHandler<HTMLInputElement>
}

const DefaultItemRenderer = ({
  checked,
  option,
  onClick,
  disabled,
}: IDefaultItemRendererProps) => (
  <div className={`item-renderer ${disabled ? 'disabled' : ''}`}>
    <div>
      <Checkbox onClick={onClick} isSelected={checked}>
        {option.label}
      </Checkbox>
    </div>
  </div>
)

const MultiSelectComponent = () => {
  const [selected, setSelected] = useState([])

  return (
    <MultiSelect
      className={`w-full lg:w-[240px] ${styles.multipleMain}`}
      options={options}
      isCreatable={false}
      disableSearch={true}
      value={selected}
      onChange={setSelected}
      labelledBy='Multiple choice'
      ClearSelectedIcon={null}
      overrideStrings={{
        allItemsAreSelected: 'All',
        clearSearch: 'Clear Search',
        clearSelected: 'Clear Selected',
        noOptions: 'No options',
        search: 'Search',
        selectAll: 'All',
        selectAllFiltered: 'Select All (Filtered)',
        selectSomeItems: 'Multiple choice',
        create: 'Create',
      }}
      ItemRenderer={(item: Item) => {
        console.log(item)
        return DefaultItemRenderer(item)
      }}
    />
  )
}

export default MultiSelectComponent
