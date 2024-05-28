import { useState } from "react"

export function filtersComponent({changeFilters}){
    const [minPrice, setMinPrice] = useState(0)

    const handleChangeMinPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMinPrice(Number(event.target.value))
    }

    return (
        /*</section>*/
        <>
        <div className="flex flex-col gap-4">
            <label htmlFor="genre" className="text-lg font-medium">Genre</label>
            <select name="Genero" id="genre">
                <option value="all">Todos</option>
                <option value="Rock">Rock</option>
                <option value="Metal">Metal</option>
                <option value="Pop">Pop</option>2
            </select>
        </div>
        <div className="flex flex-col gap-4">
            <label htmlFor="price" className="text-lg font-medium">Minimum Price</label>
            <input 
                type="range"
                id="price"
                min="0"
                max="1000"
                onChange={handleChangeMinPrice}
            />
            <span>${minPrice}</span>
        </div>
        </>
        /*</section>*/
    )
}