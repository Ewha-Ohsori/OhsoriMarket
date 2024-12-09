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
      
      // 페이지 번호 클릭시 해당 페이지 데이터 로드
      loadPageData(this.textContent);
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
      
      // 탭 클릭시 해당 탭의 데이터 로드
      loadTabData(tabId);
    });
  });

  // 기본 데이터 로드
  loadTabData("wishlist");
};

// UI 업데이트 함수들
const updatePageContent = (data) => {
  // 페이지 컨텐츠 업데이트 로직
  const contentContainer = document.querySelector('.content-container');
  contentContainer.innerHTML = data.html;
  setupEventListeners();
};

const updateTabContent = (tabId, data) => {
  // 탭 컨텐츠 업데이트 로직
  const tabContent = document.getElementById(tabId);
  tabContent.innerHTML = data.html;
  setupEventListeners();
};

const updateStatusUI = (productId, status) => {
  const button = document.querySelector(`#product-${productId} .toggle-sale-status`);
  if (status === 'completed') {
    button.textContent = '판매 완료';
    button.classList.remove('soldout');
    button.classList.add('completed');
  } else {
    button.textContent = '판매 미완';
    button.classList.remove('completed');
    button.classList.add('soldout');
  }
};

// 이벤트 리스너 설정 함수
const setupEventListeners = () => {
  // 삭제 버튼 이벤트 리스너
  document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', function() {
      const productId = this.closest('.product-item').getAttribute('data-product-id');
      deleteItem(productId);
    });
  });

  // 판매 상태 토글 버튼 이벤트 리스너
  document.querySelectorAll('.toggle-sale-status').forEach(button => {
    button.addEventListener('click', function() {
      const productId = this.closest('.product-item').getAttribute('data-product-id');
      const newStatus = this.textContent === '판매 미완' ? 'completed' : 'pending';
      updateSaleStatus(productId, newStatus);
    });
  });
};

function deleteItem(button) {
  // 버튼의 부모 요소 중 product-container를 찾음
  const productContainer = button.closest('.product-container');
  
  if (productContainer) {
    // 삭제 확인 메시지
    if (confirm('정말로 삭제하시겠습니까?')) {
      productContainer.remove(); // 해당 항목 삭제
      console.log('Product deleted');
    }
  } else {
    console.error('Product container not found');
  }
}


// 초기화 함수 정의
const init = () => {
  mypage();
};

// DOMContentLoaded 후 초기화
document.addEventListener("DOMContentLoaded", init);

// Define the loadTabData function
const loadTabData = (tabId) => {
  // Logic to load data for the specified tab
  console.log(`Loading data for tab: ${tabId}`);
  // You can add your data fetching logic here
};

// Define the showTab function if needed
const showTab = (tabId) => {
  // Logic to show the specified tab
  console.log(`Showing tab: ${tabId}`);
  // You can add your tab display logic here
};