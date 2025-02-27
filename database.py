import pyrebase
import json
import re
#import datetime
from datetime import datetime

class DBhandler:
    def __init__(self):
        with open('./authentication/firebase_auth.json') as f:
            config=json.load(f)

        firebase = pyrebase.initialize_app(config)
        self.db = firebase.database()

    def insert_item(self, name, data, img_path, user):
        item_info ={
            "sellerId": user['id'],
            "contact": data['contact'],
            "productName": data['productName'],
            "price": data['price'],
            "img_path": img_path,
            "continent": data['continent'],
            "nation": data['nation'],
            "address": data['address'],
            "state": data['state'],
            "description": data['description'],
            "buyerId": None
        }
        self.db.child("item").child(name).set(item_info)
        print(data,img_path)
        return True
    
    def get_items(self):
        items = self.db.child("item").get().val()
        if items:
            filtered_items = {key: value for key, value in items.items() if value.get("buyerId") is None}
            return filtered_items
        return {}

    def get_items_by_continent(self, continent):
        all_items = self.db.child("item").get()
        filtered_items = {}
        
        if all_items.val() is None:
            return filtered_items

        for item in all_items.each():
            item_data = item.val()
            if (item_data.get("continent", "") == continent) and (item_data.get("buyerId") is None):
                filtered_items[item.key()] = item_data

        return filtered_items
    
    def get_items_by_query(self, query):
        all_items = self.db.child("item").get()
        searched_items = {}
        
        if all_items.val() is None:
            return searched_items

        for item in all_items.each():
            item_data = item.val()
            if (query.lower() in item_data.get("productName", "").lower()) and (item_data.get("buyerId") is None):
                searched_items[item.key()] = item_data

        return searched_items

    
    # name값으로 item 정보 가져오기
    def get_item_byname(self, name):
        item = self.db.child("item").child(name).get()
        if item.val() is None:  # name에 해당하는 데이터가 없을 경우
            return None 
        return item.val()


    def insert_user(self, data, pw) :
         user_info = {
             "id" : data['id'],
             "pw" : pw,
             "email" : data['email'],
             "phone" : data['phone'],
             "region": data['region']
             # "nickname" : data['nickname']
         }
         if self.user_duplicate_check(str(data['id'])): # id 중복 체크
             self.db.child("user").push(user_info)
             return True
         else:
             return False
         
    def user_duplicate_check(self, id_string):
        users = self.db.child("user").get()
        
        print("users###", users.val())
        if str(users.val()) == "None" : # first registration
            return True
        else :
            for res in users.each() :
                value = res.val()
                
                if value['id'] == id_string:
                    return False
            return True

    def validate_user_id(self,id):
        # 영어 소문자로 시작하고, 숫자를 1개 이상 포함하며 영어와 숫자로만 구성된 5~15자
        pattern = r'^[a-z](?=.*[0-9])[a-zA-Z0-9]{4,14}$'  # 올바른 정규식
        return re.match(pattern, id)

    def validate_password(self, pw):
        # 최소 8자, 문자, 숫자, 특수문자 각각 1개 이상 포함
        pattern = r'^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$'
        return re.match(pattern, pw)
    
    def validate_email(self, email):
        pattern = r'^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
        return re.match(pattern, email)

    def validate_phone(self, phone):
        pattern = r'^\d{3}-\d{3,4}-\d{4}$'
        return re.match(pattern, phone)
        
    def find_user(self, id_, pw_):  
        users = self.db.child("user").get()
        target_value=[]
        for res in users.each():
            value = res.val()
            if value['id'] == id_ and value['pw'] == pw_:
              return True
        return False
    
    # id로 회원 정보 가져오기
    def get_user_by_id(self, id):
        users = self.db.child("user").get()
        for user in users.each():
            if user.val()["id"] == id:
                return user.val()
        return None 

    # my page 관련
    def get_user_purchases(self,id):
        all_items = self.db.child("item").get()
        items = []

        for rev in all_items.each():
            item_data = rev.val()
            if item_data.get("buyerId") == id:
                item_data["itemId"] = rev.key()
                items.append(item_data)
        return items
    
    # 판매 내역
    def get_user_sales(self, id):
        all_items = self.db.child("item").get()
        items = []

        for rev in all_items.each():
            item_data = rev.val()
            if item_data.get("sellerId") == id:
                item_data["itemId"] = rev.key()
                items.append(item_data)

        return items

  
    def update_sale_status(self, product_id, new_status):
        self.db.child("item").child(product_id).update({"state": new_status})
        print(f"Updated product {product_id} to {new_status}")
    
    def mark_item_as_sold(self, product_id, buyer_id):
        self.db.child("item").child(product_id).update({"buyerId": buyer_id})
    
        # 구매자의 구매 내역에 추가
        purchase_info = self.db.child("item").child(product_id).get().val()
        if purchase_info:
            self.db.child("purchases").push({
                "buyerId": buyer_id,
                "productId": product_id,
                "productName": purchase_info.get("productName"),
                "price": purchase_info.get("price"),
                "sellerId": purchase_info.get("sellerId"),
                "date": str(datetime.now())  # 구매 날짜 기록
            })
            print(f"Product {product_id} marked as sold to {buyer_id}.")
            return True
        return False
    
    def mark_item_as_unsold(self, product_id):
        self.db.child("item").child(product_id).update({"buyerId": None})

        # 구매자의 구매 내역에서 제거
        purchase_entries = self.db.child("purchases").get().each()
        if purchase_entries:
            for entry in purchase_entries:
                purchase = entry.val()
                if purchase.get("productId") == product_id:
                    self.db.child("purchases").child(entry.key()).remove()
                    print(f"Product {product_id} marked as unsold and removed from purchase history.")
                    return True
        print(f"Product {product_id} marked as unsold but no purchase history found.")
        return True  # 구매 내역이 없더라도 buyerId를 제거한 경우 True 반환
        
    # 사용자 정보 업데이트 함수 추가
    def update_user_info(self, user_id, new_email=None, new_phone=None):
        # 사용자 정보 조회
        user_ref = self.db.child("user").order_by_child("id").equal_to(user_id).get()

        if user_ref.val() is None:  # 사용자가 존재하지 않으면 실패
            return False

        # 해당 사용자의 정보를 업데이트
        for user in user_ref.each():
            user_key = user.key()  # 사용자 고유 키

            # 변경된 값만 업데이트
            updates = {}
            if new_email:
                updates['email'] = new_email
            if new_phone:
                updates['phone'] = new_phone

            # Firebase에서 사용자 정보 업데이트
            self.db.child("user").child(user_key).update(updates)
            print(f"User {user_id} updated with email: {new_email}, phone: {new_phone}")
            return True
        return False
      
    def get_heart_by_name(self, uid, name):
        hearts = self.db.child("heart").child(uid).get()
        target_value=""
        if hearts.val() == None:
            return target_value

        for res in hearts.each():
            key_value = res.key()
            if key_value == name:
                target_value=res.val()

        return target_value

    def update_heart(self, user_id, isHeart, item):
        heart_info = {"interested" : isHeart}
        self.db.child("heart").child(user_id).child(item).set(heart_info)
        return True

    # 리뷰 작성 등록
    def reg_review(self, data, img_path):
        review_info ={
            "buyerId": data['buyerId'],
            "sellerId": data['sellerId'],
            "title": data['title'],
            "rate": data['reviewStar'],
            "review": data['reviewContents'],
            "review_time": data['review_time'],
            "img_path": img_path
        }
        self.db.child("review").child(data['name']).set(review_info)
        return True
    
    # 리뷰 상세 조회
    def get_review_by_name(self, name):
        item = self.db.child("review").child(name).get()
        if item.val() is None:  # name에 해당하는 데이터가 없을 경우
            return None 
        return item.val()

    def update_sale_status(self, product_id, new_status):
        self.db.child("item").child(product_id).update({"state": new_status})
        print(f"Updated product {product_id} to {new_status}")
        
    # 사용자 정보 업데이트 함수 추가
    def update_user_info(self, user_id, new_email=None, new_phone=None):
        # 사용자 정보 조회
        user_ref = self.db.child("user").order_by_child("id").equal_to(user_id).get()

        if user_ref.val() is None:  # 사용자가 존재하지 않으면 실패
            return False

        # 해당 사용자의 정보를 업데이트
        for user in user_ref.each():
            user_key = user.key()  # 사용자 고유 키

            # 변경된 값만 업데이트
            updates = {}
            if new_email:
                updates['email'] = new_email
            if new_phone:
                updates['phone'] = new_phone

            # Firebase에서 사용자 정보 업데이트
            self.db.child("user").child(user_key).update(updates)
            print(f"User {user_id} updated with email: {new_email}, phone: {new_phone}")
            return True
        return False
    
    # 회원 별 리뷰 전체 조회
    def get_all_review_by_id(self, id):
        all_reviews = self.db.child("review").get()
        reviews = []
        if all_reviews.each():
            for rev in all_reviews.each():
                review_data = rev.val()
                if review_data.get("sellerId") == id:
                    review_data["reviewId"] = rev.key() 
                    reviews.append(review_data)
        return reviews

    # 좋아요 리스트
    def get_all_like_by_id(self, uid):
        likes = self.db.child("heart").child(uid).get()
        like_list = []
        
        if likes.each():
            for l in likes.each():
                if l.val().get("interested") == "Y":
                    like_list.append(l.key())
        return like_list
    
    # 회원 별 좋아요한 상품 전체 조회
    def get_liked_item_details(self, uid):
        liked_keys = self.get_all_like_by_id(uid)
        liked_items = {}
        
        for key in liked_keys:
            item = self.get_item_byname(key)
            liked_items[key] = item
        
        return liked_items

    def update_sale_status(self, product_id, new_status):
        self.db.child("item").child(product_id).update({"state": new_status})
        print(f"Updated product {product_id} to {new_status}")

    def get_buyerId_by_productName(self, productName):
        items = self.db.child("item").get()
        
        for item in items.each():
            if item.key() == productName:
                return item.val()
        return None

"""        
    # 사용자 정보 업데이트 함수 추가
    def update_user_info(self, user_id, new_email=None, new_phone=None):
        # 사용자 정보 조회
        user_ref = self.db.child("user").order_by_child("id").equal_to(user_id).get()

        if user_ref.val() is None:  # 사용자가 존재하지 않으면 실패
            return False

        # 해당 사용자의 정보를 업데이트
        for user in user_ref.each():
            user_key = user.key()  # 사용자 고유 키

            # 변경된 값만 업데이트
            updates = {}
            if new_email:
                updates['email'] = new_email
            if new_phone:
                updates['phone'] = new_phone

            # Firebase에서 사용자 정보 업데이트
            self.db.child("user").child(user_key).update(updates)
            print(f"User {user_id} updated with email: {new_email}, phone: {new_phone}")
            return True
        return False
"""
