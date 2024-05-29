"use client";
import { useState } from "react"
import { Album } from "../lib/definitions"

type FiltersComponentProps = {
    setFilters: React.Dispatch<React.SetStateAction<{ genre: string; minPrice: number; maxPrice: number }>>;
  };
export const FiltersComponent: React.FC<FiltersComponentProps> = ({ setFilters }: FiltersComponentProps) => {
    const [minPrice, setMinPrice] = useState(0)

    const handleGenreChange = (event: { target: { value: any; }; }) => {
        setFilters((prevFilters: any) => ({
          ...prevFilters,
          genre: event.target.value,
        }));
      };
    
      const handleChangeMinPrice = (event: { target: { value: any; }; }) => {
        const value = Number(event.target.value);
        setMinPrice(value);
        setFilters((prevFilters: any) => ({
          ...prevFilters,
          minPrice: value,
        }));
      };

    return (
        /*</section>*/
        <>
        <div className="flex flex-col gap-4">
            <label htmlFor="genre" className="text-lg font-medium">Genre</label>
            <select name="Genero" id="genre">
                <option value="all">Todos</option>
                <option value="Rock">Rock</option>
                <option value="Metal">Metal</option>
                <option value="Pop">Pop</option>
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