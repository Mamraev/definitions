export interface UriRecord{
    "Id": number,
    "Type": string,
    "LawSource": string,
    "LawSubSource": string,
    "OfficialName": string,
    "NormalizeName": string,
    "KnessetUrl": string,
    "RecentOfficialNames": string[],
    "PublicationDate": string,
    "Uri": string,
    "HalahotName": string,
    "TnufaName": string,
    "KahamName": string,
    "OpenLawBook": {
        "OpenLawBookName": string,
        "OpenLawBookUrl": string,
        "OpenLawBookUri": string,
        "OpenLawBookNameInNamesList": string,
        "OpenLawBookInLawHeader": string,
        "WikiHref": string
    }
}