const puppeteer = require('puppeteer');
var xlsx = require('xlsx');

var wb = xlsx.readFile("CSProject.xlsx", {cellDates:true});

var ws = wb.Sheets["ProjectData"];

var ary = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];


async function scrapeProduct(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    var j = 0;
    var k = 0;

    for(i = 2; i <= 52; i++){
        //State name
        var a = '//*[@id="usa_table_countries_yesterday"]/tbody[1]/tr[' + i.toString() + ']/td[2]/a';
        const [state] = await page.$x(a);
        const txt = await state.getProperty('textContent');
        ary[j][k] = await txt.jsonValue();
        
        k = 1;

        // Total cases
        var a = '//*[@id="usa_table_countries_yesterday"]/tbody[1]/tr[' + i.toString() + ']/td[3]';
        const [tc] = await page.$x(a);
        const txt1 = await tc.getProperty('textContent');
        ary[j][k] = await txt1.jsonValue();

        k = 2;
        
        // New cases
        var a = '//*[@id="usa_table_countries_yesterday"]/tbody[1]/tr[' + i.toString() + ']/td[4]';
        const [nc] = await page.$x(a);
        const txt2 = await nc.getProperty('textContent');
        ary[j][k] = await txt2.jsonValue();

        k = 3;

        // Total Deaths
        var a = '//*[@id="usa_table_countries_yesterday"]/tbody[1]/tr[' + i.toString() + ']/td[5]';
        const [td] = await page.$x(a);
        const txt3 = await td.getProperty('textContent');
        ary[j][k] = await txt3.jsonValue();

        k = 4;

        // New Deaths
        var a = '//*[@id="usa_table_countries_yesterday"]/tbody[1]/tr[' + i.toString() + ']/td[6]';
        const [nd] = await page.$x(a);
        const txt4 = await nd.getProperty('textContent');
        ary[j][k] = await txt4.jsonValue();

        j = j + 1;
        k = 0;
    }

    xlsx.utils.sheet_add_aoa(ws, ary);
    xlsx.writeFile(wb, "CSProject.xlsx");

    
    browser.close();

}

scrapeProduct('https://www.worldometers.info/coronavirus/country/us/')