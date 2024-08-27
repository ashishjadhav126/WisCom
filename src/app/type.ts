export interface User {
    
        "id": number,
        "username"?: string,
        "email"?: string,
        "firstName": string,
        "lastName": string,
        "gender"?: string,
        "image"?:string,
        "token"?: string,
        "age":number,
        "isDeleted"?:boolean
}
export interface Category {
    slug:string,
    url:string,
    name:string
}
export interface Products {
    
        "id": number,
        "title": string,
        "description": string,
        "category": string,
        "price": number,
        "discountPercentage": number,
        "rating": number,
        "stock": number,
        "tags": string[],
        "brand": string,
        "sku": string,
        "weight": number,
        "dimensions": {
          "width": number,
          "height": number,
          "depth": number
        },
        "warrantyInformation": string,
        "shippingInformation": string,
        "availabilityStatus": string,
        "reviews": [
          {
            "rating": number,
            "comment": string,
            "date": string,
            "reviewerName": string,
            "reviewerEmail": string
          },
          
        ],
        "returnPolicy": string,
        "minimumOrderQuantity": number,
        "meta": {
          "createdAt": string,
          "updatedAt": string,
          "barcode": string,
          "qrCode": string
        },
        "thumbnail": string,
        "images": string[]
      }



