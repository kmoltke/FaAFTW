import { useEffect, useState } from "react"
import styles from "./Filter.module.css"
import "../../styles/template.css"
import FilterComponent from "../FilterComponent/FilterComponent"
import { NavLink } from "react-router-dom"

type Props = {
  value: Filters
  itemsNum: number
  onChange: (val: Filters) => void
}

export type Filters = {
  genre?: string
  artist?: string
  decades?: string
}

function Filter(props: Props) {
  const [genres, setGenres] = useState<string[]>([])
  const [artists, setArtist] = useState<string[]>([])
  const [years, setYears] = useState<string[]>([])

  useEffect(() => {
    const datafetch = async () => {
      const responses = await Promise.all([
        fetch("http://localhost:5000/categories/genre"),
        fetch("http://localhost:5000/categories/artist"),
        fetch("http://localhost:5000/categories/decades"),
      ])

      const data1 = await responses[0].json()
      const data2 = await responses[1].json()
      const data3 = await responses[2].json()

      setGenres(data1)
      setArtist(data2)
      setYears(data3)
    }
    datafetch()
  }, [])

  const onGenreChange = (val: string | undefined) => {
    props.onChange({
      ...props.value,
      genre: val,
    })
  }
  const onArtistChange = (val: string | undefined) => {
    props.onChange({
      ...props.value,
      artist: val,
    })
  }
  const onDecadeChange = (val: string | undefined) => {
    props.onChange({
      ...props.value,
      decades: val,
    })
  }

  return (
    <>
      <div className={styles.header}>
        <div className={styles.info}>
          <h1>Shop Vinyl Records</h1>
          <h3 className="collectionCount">({props.itemsNum} results found)</h3>
        </div>
        <div className={styles.filterOuter}>
          <div className={styles.filterWrapper}>
            <div className={styles.filterComponent}>
              <FilterComponent
                category="Genre"
                data={genres}
                value={props.value.genre}
                onChange={onGenreChange}
              ></FilterComponent>

              {props.value.genre && (
                <button
                  className={styles.filterSelectionButton}
                  onClick={() => {
                    onGenreChange("")
                  }}
                >
                  <p>{props.value.genre}</p>
                  <p>⨂</p>
                  {/* ⨉ */}
                </button>
              )}
            </div>
            <div className={styles.filterComponent}>
              <FilterComponent
                category="Artist"
                data={artists}
                value={props.value.artist}
                onChange={onArtistChange}
              ></FilterComponent>
              {props.value.artist && (
                <button
                  className={styles.filterSelectionButton}
                  onClick={() => {
                    onArtistChange("")
                  }}
                >
                  <p>{props.value.artist}</p>
                  <p>⨂</p>
                  {/* ⨉ */}
                </button>
              )}
            </div>
            <div className={styles.filterComponent}>
              <FilterComponent
                category="Decade"
                data={years}
                value={props.value.decades}
                onChange={onDecadeChange}
              ></FilterComponent>
              {props.value.decades && (
                <button
                  className={styles.filterSelectionButton}
                  onClick={() => {
                    onDecadeChange("")
                  }}
                >
                  <p>{props.value.decades}</p>
                  <p>⨂</p>
                  {/* ⨉ */}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Filter
