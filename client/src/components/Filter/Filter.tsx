import { useEffect, useState } from 'react'
import styles from './Filter.module.css'
import '../../styles/template.css'
import FilterComponent from '../FilterComponent/FilterComponent'
import { useSearchParams } from 'react-router-dom'

type FilterProps = {
  itemsNum: number
}

function Filter(props: FilterProps) {
  const [genresData, setGenresData] = useState<string[]>([])
  const [artistsData, setArtistsData] = useState<string[]>([])
  const [decadesData, setDecadesData] = useState<string[]>([])
  const [searchParams, setSearchParams] = useSearchParams()

  const removeSearchParams = (key: string) => {
    if (searchParams.has(key)) {
      searchParams.delete(key)
      setSearchParams(searchParams)
    }
  }

  const appendSearchParams = (key: string, value: string) => {
    searchParams.set(key, value)
    setSearchParams(searchParams)
  }

  useEffect(() => {
    const datafetch = async () => {
      const responses = await Promise.all([
        fetch('http://localhost:5000/categories/genre'),
        fetch('http://localhost:5000/categories/artist'),
        fetch('http://localhost:5000/categories/decade'),
      ])

      const data1 = await responses[0].json()
      const data2 = await responses[1].json()
      const data3 = await responses[2].json()

      setGenresData(data1)
      setArtistsData(data2)
      setDecadesData(data3)
    }
    datafetch()
  }, [])

  let genre = searchParams.get('genre') ?? ''
  let artist = searchParams.get('artist') ?? ''
  let decade = searchParams.get('decade') ?? ''

  if (genresData && !genresData.includes(genre)) {
    genre = ''
  }
  if (artistsData && !artistsData.includes(artist)) {
    artist = ''
  }
  if (decadesData && !decadesData.includes(decade)) {
    decade = ''
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
                data={genresData}
                value={genre}
                onChange={appendSearchParams}
              />
              {genre && (
                <button
                  className={styles.filterSelectionButton}
                  onClick={() => {
                    removeSearchParams('genre')
                  }}
                >
                  <p>{genre}</p>
                  <p>⨂</p>
                </button>
              )}
            </div>
            <div className={styles.filterComponent}>
              <FilterComponent
                category="Artist"
                data={artistsData}
                value={artist}
                onChange={appendSearchParams}
              />
              {artist && (
                <button
                  className={styles.filterSelectionButton}
                  onClick={() => {
                    removeSearchParams('artist')
                  }}
                >
                  <p>{artist}</p>
                  <p>⨂</p>
                </button>
              )}
            </div>
            <div className={styles.filterComponent}>
              <FilterComponent
                category="Decade"
                data={decadesData}
                value={decade}
                onChange={appendSearchParams}
              />
              {decade && (
                <button
                  className={styles.filterSelectionButton}
                  onClick={() => {
                    removeSearchParams('decade')
                  }}
                >
                  <p>{decade}</p>
                  <p>⨂</p>
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
