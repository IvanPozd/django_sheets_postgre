#import creds
import httplib2
import os
import requests

from googleapiclient.discovery import build
from oauth2client.service_account import ServiceAccountCredentials
from datetime import date
from bs4 import BeautifulSoup


# Функция возвращает значение кура доллара к рублю
def current_usd_rub():
    today = date.today().strftime("%d/%m/%Y")
    url = f"https://www.cbr.ru/scripts/XML_daily.asp?date_req={today}"
    r = requests.get(url)
    soup = BeautifulSoup(r.text, "xml",)
    all_valuete = soup.find_all("Valute")
    for val in all_valuete:
        if val["ID"] == "R01235":
            d = val.find("Value").text.split(",")
            dollar = ".".join(d)

            return float(dollar)
        

def get_service_sacc():
    creds_json = (os.path.dirname(__file__) + "/creds/НАЗВАНИЕ-ВАШЕГО-ФАЙЛА")
    scopes = ["https://www.googleapis.com/auth/spreadsheets"]

    creds_service = ServiceAccountCredentials.from_json_keyfile_name(
        creds_json, scopes
    ).authorize(httplib2.Http())
    return build("sheets", "v4", http=creds_service)


#def get_service_simple():
    return build("sheets", "v4", developerKey=creds.api_key)

#def set_data(array):
    for row in array:
        date_strings = row[3].split('.')
        if Data.objects.filter():
            post_data = Data.objects.update(
                order_number=int(row[1]),
                price_usd=int(row[2]),
                date_ship=date(int(date_strings[2]), int(date_strings[1]), int(date_strings[0])),
                price_rub=float(row[4])
            )
            post_data.save()


def master():
    all_data = []
    # service = get_service_simple()
    service = get_service_sacc()
    sheet = service.spreadsheets()

    # https://docs.google.com/spreadsheets/d/xxx/edit#gid=0
    sheet_id = "ID-ВАШЕЙ-ТАБЛИЦЫ"

    # https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/get
    # respA = sheet.values().get(spreadsheetId=sheet_id, range="Лист1!A1:A50").execute()
    # respB = sheet.values().get(spreadsheetId=sheet_id, range="Лист1!B1:B50").execute()

    # https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/batchGet
    resp = sheet.values().batchGet(spreadsheetId=sheet_id, ranges=["Лист1"]).execute()

    data = resp["valueRanges"][0]["values"]

    rub = current_usd_rub()
    
    for index, i in enumerate(data):
        if index == 0:
            i.append("Цена, RUB")
        else:
            dollar_cost = float(i[2])
            rub_cost = dollar_cost * rub
            rub_format = f"{rub_cost:.2f}"
            i.append(rub_format) 
            all_data.append({
                data[0][0] : i[0],
                data[0][1] : i[1],
                data[0][2] : i[2],
                data[0][3] : i[3],
                data[0][4] : i[4]
            })
        

    return all_data


if __name__ == "__main__":
    for item in master():
        print(item)