import requests

url = "https://kinapparel.org//products.json"  # Shopify mağazası
headers = {"User-Agent": "Mozilla/5.0"}

response = requests.get(url, headers=headers)

if response.status_code == 200:
    data = response.json()  # JSON formatında veriyi al
    products = data["products"]  # Ürünleri liste olarak al
    for product in products:
        print(f"Ürün Adı: {product['title']}, Fiyat: {product['variants'][0]['price']}")
else:
    print("Veri alınamadı.")