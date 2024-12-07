// mypage 함수 정의
const mypage = () => {
  // 네비게이션 바 설정
  const mypageNavBar = document.querySelector("#navbar__menu__mypage");
  mypageNavBar.classList.add("navbar__menu_selected");

  // 페이지 번호 활성화 설정
  const pageNumbers = document.querySelectorAll(".page-number");
  pageNumbers.forEach((page) => {
    page.addEventListener("click", function () {
      pageNumbers.forEach((p) => p.classList.remove("active"));
      this.classList.add("active");
      loadPageData(this.textContent); // 페이지 데이터 로드
    });
  });

  // Tab 메뉴 설정
  const tabs = document.querySelectorAll(".tab");
  const tabContents = document.querySelectorAll(".tab-content");
  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      tabs.forEach((t) => t.classList.remove("active"));
      tabContents.forEach((content) => (content.style.display = "none"));

      this.classList.add("active");
      const tabId = this.getAttribute("onclick").split("'")[1];
      document.getElementById(tabId).style.display = "block";
      loadTabData(tabId); // 탭 데이터 로드
    });
  });

  // 리뷰 전체 조회 버튼 클릭 이벤트 추가
  const reviewTab = document.getElementById('review-tab');
  reviewTab.addEventListener('click', function (event) {
    event.preventDefault(); // 기본 링크 동작 방지
    loadAllReviews(); // 리뷰 로드 함수 호출
  });

  // 기본 데이터 로드
  loadTabData("wishlist");
};

// 페이지 데이터 로드 함수
const loadPageData = (pageNumber) => {
  $.ajax({
    type: 'GET',
    url: '/api/mypage/page',
    data: { page: pageNumber },
    success: function(response) {
      updatePageContent(response);
    },
    error: function(request, status, error) {
      console.error('페이지 로드 실패:', error);
    }
  });
};

// 탭 데이터 로드 함수
const loadTabData = (tabId) => {
  $.ajax({
    type: 'GET',
    url: '/api/mypage/tab',
    data: { tab: tabId },
    success: function(response) {
      updateTabContent(tabId, response);
    },
    error: function(request, status, error) {
      console.error('탭 데이터 로드 실패:', error);
    }
  });
};

// 전체 리뷰 로드 함수
const loadAllReviews = () => {
  $.ajax({
    type: 'GET',
    url: '/api/reviews', // 새로운 API 경로
    success: function(response) {
      updateReviewContent(response);
      document.getElementById('review-overview').style.display = 'block'; // 리뷰 표시
    },
    error: function(request, status, error) {
      console.error('리뷰 로드 실패:', error);
    }
  });
};

// 리뷰 콘텐츠 업데이트 함수
const updateReviewContent = (data) => {
  const reviewItemsContainer = document.querySelector('.review-items');
  reviewItemsContainer.innerHTML = ''; // 기존 리뷰 항목 초기화
  data.reviews.forEach(review => {
    const reviewItem = document.createElement('li');
    reviewItem.classList.add('review-content');
    reviewItem.innerHTML = `
      <div class="review-image">
        <img src="${review.img_path}" alt="${review.product_name}" class="review-thumbnail">
      </div>
      <div class="review-details">
        <p><strong>상품명:</strong> ${review.product_name}</p>
        <p><strong>제목:</strong> ${review.title}</p>
        <p><strong>리뷰 내용:</strong> ${review.review}</p>
        <p><strong>평점:</strong> ${review.rate}</p>
        <p><strong>작성자:</strong> ${review.buyerId}</p>
        <p><strong>작성 시간:</strong> ${review.review_time}</p>
      </div>
    `;
    reviewItemsContainer.appendChild(reviewItem);
  });
};

// 판매 상태 변경 함수
const updateSaleStatus = (productId, status) => {
  $.ajax({
    type: 'POST',
    url: '/api/mypage/update-status',
    data: {
      productId: productId,
      status: status
    },
    success: function(response) {
      // 상태 업데이트 성공 시 UI 업데이트
      updateStatusUI(productId, status);
    },
    error: function(request, status, error) {
      console.error('상태 업데이트 실패:', error);
    }
  });
};

// 항목 삭제 함수
const deleteItem = (productId) => {
  $.ajax({
    type: 'POST',
    url: '/api/mypage/delete-item',
    data: { productId: productId },
    success: function(response) {
      // 삭제 성공 시 UI에서 항목 제거
      $(`#product-${productId}`).remove();
    },
    error: function(request, status, error) {
      console.error('항목 삭제 실패:', error);
    }
  });
};

// UI 업데이트 함수들
const updatePageContent = (data) => {
  const contentContainer = document.querySelector('.content-container');
  contentContainer.innerHTML = data.html;
  setupEventListeners(); // 이벤트 리스너 설정
};

const updateTabContent = (tabId, data) => {
  const tabContent = document.getElementById(tabId);
  tabContent.innerHTML = data.html;
  setupEventListeners(); // 이벤트 리스너 설정
};

const updateStatusUI = (productId, status) => {
  const button = document.querySelector(`#product-${productId} .toggle-sale-status`);
  button.textContent = status === 'completed' ? '판매 완료' : '판매 미완';
  button.classList.toggle('completed', status === 'completed');
  button.classList.toggle('soldout', status !== 'completed');
};

// 이벤트 리스너 설정 함수
const setupEventListeners = () => {
  document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', function() {
      const productId = this.closest('.product-item').getAttribute('data-product-id');
      deleteItem(productId); // 아이템 삭제
    });
  });

  document.querySelectorAll('.toggle-sale-status').forEach(button => {
    button.addEventListener('click', function() {
      const productId = this.closest('.product-item').getAttribute('data-product-id');
      const newStatus = this.textContent === '판매 미완' ? 'completed' : 'pending';
      updateSaleStatus(productId, newStatus); // 판매 상태 업데이트
    });
  });
};

// 초기화 함수 정의
const init = () => {
  mypage(); // mypage 함수 호출
};

// DOMContentLoaded 후 초기화
document.addEventListener("DOMContentLoaded", init);
<<<<<<< Updated upstream
=======

// loadTabData 함수 정의
const loadTabData = (tabId) => {
  console.log(`탭 데이터 로드 중: ${tabId}`);
};

// showTab 함수 정의 (필요시)
const showTab = (tabId) => {
  console.log(`탭 표시 중: ${tabId}`);
};
>>>>>>> Stashed changes
