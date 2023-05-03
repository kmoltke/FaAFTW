import { useEffect, useState } from "react"
import styles from "./FilterComponent.module.css"
import "../../styles/template.css"

type Props = {
  category: string
  value: string | undefined
  onChange: (val: string | undefined) => void
  data: string[]
}

function FilterComponent(props: Props) {
  const category = props.category
  return (
    <div className={styles.filterWrap}>
      <select
        defaultValue={props.category}
        value={props.category}
        className={styles.filterComponentSelect}
        onChange={(e) => {
          if (e.target.value === "") {
            props.onChange(undefined)
          }
          props.onChange(e.target.value)
        }}
      >
        <option value={""}>{category}</option>

        {props.data.map((item: any) => (
          <option key={item}>{item}</option>
        ))}
      </select>
      <span className={styles.icon}> ▼ </span>
    </div>
  )
}

export default FilterComponent
