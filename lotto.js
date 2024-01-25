const body = document.querySelector("body");
const nav = document.querySelector(".nav_bar");

const toggleList = document.querySelectorAll(".toggleSwitch");
const toggleImg = document.querySelector(".display_mode_icon");

const lottoContainer = document.querySelector(".lotto_machine_container");
const LottogenerateBtn = document.querySelector(".num_generate_btn");
const lottoNumWrap = document.querySelectorAll(".lotto_num_wrap");
const lottoNum = document.querySelectorAll(".lotto_num");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

toggleList.forEach(($toggle) => {
  $toggle.onclick = () => {
    const isActive = $toggle.classList.contains("active");

    if (isActive) {
      $toggle.classList.remove("active");
      toggleImg.setAttribute("src", "img/sun.png");
      body.classList.remove("dark");
      body.classList.add("lite");

      nav.classList.remove("nav_dark");
      nav.classList.add("nav_lite");

      LottogenerateBtn.classList.remove("btn_dark");
      LottogenerateBtn.classList.add("btn_lite");
    } else {
      $toggle.classList.add("active");
      toggleImg.setAttribute("src", "img/moon.png");
      body.classList.remove("lite");
      body.classList.add("dark");

      nav.classList.remove("nav_lite");
      nav.classList.add("nav_dark");

      LottogenerateBtn.classList.remove("btn_lite");
      LottogenerateBtn.classList.add("btn_dark");
    }
  };
});

let generating = false; // 생성 중인지 여부를 나타내는 플래그

LottogenerateBtn.addEventListener("click", async function () {
  if (generating) {
    return;
  }
  generating = true; // 생성 중 플래그를 활성화

  lottoContainer.classList.add("vibration");
  // Set을 사용하여 중복을 방지하고 유일한 숫자를 저장
  let createdLottoNum = new Set();
  lottoNumWrap[0].classList.remove("fade-in");
  await sleep(100);

  // 기존 로또 번호 초기화
  for (let i = 0; i < 6; i++) {
    lottoNumWrap[i].style.backgroundColor = "";
    lottoNumWrap[i].classList.remove("fade-in");
    lottoNum[i].textContent = "";
  }

  // 중복을 피하면서 유일한 숫자를 생성
  while (createdLottoNum.size < 6) {
    let ran = Math.floor(Math.random() * 45) + 1;
    createdLottoNum.add(ran);
  }
  // Set을 배열로 변환
  const sortedArray = [...createdLottoNum].sort((a, b) => a - b);

  // 정렬된 배열을 다시 Set으로 변환 (중복 제거를 위해)
  const sortedLottoSet = new Set(sortedArray);

  // Set에서 숫자를 꺼내서 화면에 출력
  let index = 0;
  for (let num of sortedLottoSet) {
    if (num <= 10) {
      lottoNumWrap[index].style.backgroundColor = "#FFC107";
    } else if (num <= 20) {
      lottoNumWrap[index].style.backgroundColor = "#007BFF";
    } else if (num <= 30) {
      lottoNumWrap[index].style.backgroundColor = "#DC3545";
    } else if (num <= 40) {
      lottoNumWrap[index].style.backgroundColor = "grey";
    } else {
      lottoNumWrap[index].style.backgroundColor = "#28A745";
    }
    lottoNum[index].textContent = num;
    lottoNumWrap[index].classList.add("fade-in");
    index++;
    await sleep(800);
  }
  lottoContainer.classList.remove("vibration");
  generating = false; // 생성 완료 후 플래그를 비활성화
});
