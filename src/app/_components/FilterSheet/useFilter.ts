import {useState} from "react";

export const useFilter = () => {

    const [activeCat, setActiveCat] = useState(new Set())

    const handleSelectCat = (cat) => {
        const newSet = new Set(activeCat);
        if (newSet.has(cat)) newSet.delete(cat);
        else newSet.add(cat);
        setActiveCat(newSet);
    }



    return {activeCat, handleSelectCat}
}


export default useFilter