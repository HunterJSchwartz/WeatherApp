export default function UnitSwitch({unit, UpdateUnit}: any) {

    function ChangeUnit(e: any) {
        UpdateUnit(e.target.value);
        e.target.classList += " current-unit";
    }

    return ( 
        <div className="unit-switcher">
            <button onClick={(e) => {ChangeUnit(e)}} className={unit === "Imperial" ?
                                    "unit current-unit" : "unit"} value="Imperial">F</button>
            <button onClick={(e) => {ChangeUnit(e)}} className={unit === "Metric" ? 
                                    "unit current-unit" : "unit"} value="Metric">C</button>
        </div>
    );
}
