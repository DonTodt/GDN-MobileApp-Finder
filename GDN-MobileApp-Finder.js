//
function main() {
var report = AdWordsApp.report("SELECT Url " +
                                 "FROM URL_PERFORMANCE_REPORT " +
                              //   "WHERE CampaignName = 'PUT IN CAMPAIGN NAME HERE' " + 
                              //   "AND AdGroupName = 'PUT IN ADGROUP NAME HERE' " + 
                                 "DURING LAST_WEEK ",
                              { apiVersion: 'v201809'});
  var SPREADSHEET_URL = "PUT IN GOOGLE SPREADSHEET URL HERE";
  var SHEET_NAME = "PUT IN SHEET NAME HERE";  
  var ss = SpreadsheetApp.openByUrl(SPREADSHEET_URL);
  var sheet = ss.getSheetByName(SHEET_NAME);
  
  var timeZone = AdWordsApp.currentAccount().getTimeZone();
  var formattedDate = Utilities.formatDate(new Date(), timeZone, "yyyy-MM-dd' 'HH:mm");
  
  var matchword = "mobileapp";
  var rows = report.rows();
/*
  while (rows.hasNext()) {
    var row = rows.next();
    var placement = row['Url'];   

    if (match.indexOf(match[i][0]) != -1)
    
    var row = rows.next();
    
    sheet.appendRow([row['Url'],row['Domain'],row['Impressions'], row['AdNetworkType1'], row['AdNetworkType1']]);
  } 
  
}
*/
  var i = 0
  while (rows.hasNext()) {
    //Variable, in welcher die naechste Zeile gespeichert wird:
    var row = rows.next();
    
    
    //Variable, in welcher die Metriken von der oben geholten Zeile gespeichert wird:
    var placement = row['Url'];
    

      //Nachfolgend wird nun in den Placement URLs nach allen Matchwords gesucht:
      
      if (placement.indexOf(matchword) != -1) {
            //Die Daten werden im Google Spreadsheet ausgegeben
           
            sheet.appendRow([placement]);
        var i = i+1;
        
      }
    }
    sheet.getRange('C1').setValue('New entries found: ' + i)
    sheet.getRange('B1').setValue(new Date())
  }
//}