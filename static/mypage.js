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

  // 기본 데이터 로드
  loadTabData("wishlist");
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

// loadTabData 함수 정의
const loadTabData = (tabId) => {
  console.log(`탭 데이터 로드 중: ${tabId}`);
};

// showTab 함수 정의 (필요시)
const showTab = (tabId) => {
  console.log(`탭 표시 중: ${tabId}`);
};