const Launch = async () => {
  let blocks = document.getElementsByClassName("block");
  for (let i = 0; i < blocks.length; i++) {
    let block = blocks[i];
    let block_h4 = block.getElementsByTagName("h4")[0];
    let block_h4_span = block_h4.getElementsByTagName("div")[0];
    block_h4_span.addEventListener("click", function () {
      let block_data = block.getElementsByClassName("data")[0];
      if (block_data.style.display == "block") {
        block_data.style.display = "none";
      } else {
        block_data.style.display = "block";
      }
    });
  }
  console.log(blocks);
};

window.onload = Launch;
