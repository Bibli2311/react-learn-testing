import { cloneElement, useEffect, useState } from "react"

function APIComponent() {
    const url = "https://www.hvakosterstrommen.no/api/v1/prices/2024/08-18_NO5.json"

    const [electricity, setElectricity] = useState(0)

    useEffect(() => {
        fetch(url)
        .then((res) => res.json())
        .then((jsonResult) => {
            setElectricity(jsonResult[0]["NOK_per_kWh"])
        })

    }, [])
    return(
        <div>
            <p>
                Norwegian price: { electricity ? electricity : "Loading electricity price"}
            </p>
        </div>
    )

}

export default APIComponent