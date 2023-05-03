import { useEffect, useState } from "react"
import styles from "./Filter.module.css"
import "../../styles/template.css"
import FilterComponent from "../FilterComponent/FilterComponent"
import {
  NavLink,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom"

type Props = {
  itemsNum: number
}

function Filter(props: Props) {
  const [genre, setGenre] = useState("")
  const [decades, setDecade] = useState("")
  const [artist, setArtist] = useState("")

  const navigate = useNavigate()
  const location = useLocation()

  const [genresData, setGenresData] = useState<string[]>([])
  const [artistsData, setArtistsData] = useState<string[]>([])
  const [yearsData, setYearsData] = useState<string[]>([])
  const [searchParams, setSearchParams] = useSearchParams()

  const removeSearchParams = (key: string) => {
    if (searchParams.has(key)) {
      searchParams.delete(key)
      setSearchParams(searchParams)
    }
  }

  const appendSearchParams = (key: string, value: string) => {
    if (!searchParams.has(key)) {
      searchParams.set(key, value)
      setSearchParams(searchParams)
    }
  }
  useEffect(() => {
    const genreParam = searchParams.get("genre") ?? ""
    const artistParam = searchParams.get("artist") ?? ""
    const decadeParam = searchParams.get("decades") ?? ""

    setGenre(genreParam)
    setArtist(artistParam)
    setDecade(decadeParam)
  }, [searchParams])

  useEffect(() => {
    const datafetch = async () => {
      const responses = await Promise.all([
        fetch("http://localhost:5000/categories/genre"),
        fetch("http://localhost:5000/categories/artist"),
        fetch("http://localhost:5000/categories/decade"),
      ])

      const data1 = await responses[0].json()
      const data2 = await responses[1].json()
      const data3 = await responses[2].json()

      setGenresData(data1)
      setArtistsData(data2)
      setYearsData(data3)
    }
    datafetch()
  }, [])

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
                data={genresData}
                value={genre}
                onChange={appendSearchParams}
              ></FilterComponent>

              {genre && (
                <button
                  className={styles.filterSelectionButton}
                  onClick={() => {
                    removeSearchParams("genre")
                  }}
                >
                  <p>{genre}</p>
                  <p>⨂</p>
                  {/* ⨉ */}
                </button>
              )}
            </div>
            <div className={styles.filterComponent}>
              <FilterComponent
                category="Artist"
                data={artistsData}
                value={artist}
                onChange={appendSearchParams}
              ></FilterComponent>
              {artist && (
                <button
                  className={styles.filterSelectionButton}
                  onClick={() => {
                    removeSearchParams("artist")
                  }}
                >
                  <p>{artist}</p>
                  <p>⨂</p>
                  {/* ⨉ */}
                </button>
              )}
            </div>
            <div className={styles.filterComponent}>
              <FilterComponent
                category="Decade"
                data={yearsData}
                value={decades}
                onChange={appendSearchParams}
              ></FilterComponent>
              {decades && (
                <button
                  className={styles.filterSelectionButton}
                  onClick={() => {
                    removeSearchParams("decades")
                  }}
                >
                  <p>{decades}</p>
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
