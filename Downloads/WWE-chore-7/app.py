from flask import Flask, render_template, request
import sys, os

# template과 static 폴더 불러오는 경로 변경
application = Flask(__name__, template_folder="src/pages", static_folder="src")

@application.route("/")
def hello():
    return render_template("index.html")

@application.route("/list")
def view_list():
    return render_template("list.html")

@application.route("/review")
def view_review():
    return render_template("review.html")

@application.route("/reg_items")
def reg_item():
    return render_template("register.html")

@application.route("/reg_reviews")
def reg_review():
    return render_template("reg_reviews.html")

@application.route("/submit_product_post", methods=['POST'])
def reg_item_submit_post():
    image_file = request.files["file"]
    
    # 이미지 저장 경로
    image_dir = "src/image"
    
    # 파일 이름 확인 
    if image_file.filename == '':
        return "No selected file"

    # 파일 경로와 이름을 결합하여 저장
    image_path = os.path.join(image_dir, image_file.filename)
    
    # 파일 저장
    try:
        image_file.save(image_path)
    except Exception as e:
        return f"Error saving file: {e}"

    data = request.form
    return render_template("submit_item_result.html", data=data, img_path=image_path)

if __name__ == "__main__":
    application.run(host='0.0.0.0', debug=True)