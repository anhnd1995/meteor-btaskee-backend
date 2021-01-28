// const lastColumn = document.querySelectorAll('.fixed-right');
const header = document.querySelectorAll('.fixed-top');
const tableContainer = document.querySelector('.table-responsive');

tableContainer.addEventListener('scroll', (e) => {
  // removeShadowFromColumn();
  removeShadowFromHeader();
});

function removeShadowFromHeader() {
  if (tableContainer.scrollTop === 0) {
    header.forEach(th => th.classList.add('noShadow'));
  } else {
    header.forEach(th => th.classList.remove('noShadow'));
  }
}

// function removeShadowFromColumn() {
//   const widthDiff = tableContainer.scrollWidth - tableContainer.clientWidth;

//   if (tableContainer.scrollLeft === widthDiff) {
//     lastColumn.forEach(th => th.classList.add('noShadow'));
//   } else {
//     lastColumn.forEach(td => td.classList.remove('noShadow'));
//   }
// }

removeShadowFromHeader();