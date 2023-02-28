import * as XLSX from "xlsx";

export const SaveExcel = (heading, headers, data, fileName) => {
  
    //Tomar del response solo el consumo total
    var getConsumoTotal = data.map(x => {
        return x.consumoTotal;
    });

    //Sumar el consumo total y asignarlo a la variable
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    var total = getConsumoTotal.reduce(reducer);

    //Had to create a new workbook and then add the header
    // A workbook is the name given to an Excel file
    var wb = XLSX.utils.book_new(); // make Workbook of Excel
    XLSX.utils.sheet_add_aoa(wb, heading);

    //Starting in the second row to avoid overriding and skipping headers
    var totales = XLSX.utils.sheet_add_json(wb, data, {
        origin: "A2",
        header: headers,
        skipHeader: true,
    });

    //Fila de total
    if (total !== 0) {
        XLSX.utils.sheet_add_aoa(wb, [
            ["Total", total]
        ], { origin: -1 });
    }

    // add Worksheet to Workbook
    // Workbook contains one or more worksheets
    XLSX.utils.book_append_sheet(wb, totales, "REPORTE"); // sheetAName is name of Worksheet

    // export Excel file
    XLSX.writeFile(wb, `${fileName}.xlsx`); // name of the file is 'book.xlsx'
}
