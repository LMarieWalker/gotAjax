
$(document).ready(function(){

  var notFound = document.getElementById("notFound");

  // CHARACTERS: LOOP
  var charDiv = document.getElementById("mainCharCard");
  var charArr = ['Daenerys Targaryen', 'Arya Stark', 'Jon Snow', 'Marie Walker'];

  function renderCharPage() {
    for (let i = 0; i < charArr.length; i++) {
      $.get(('https://www.anapioficeandfire.com/api/characters?name='+charArr[i]), function(charData){
        if (charData == 0) {
          console.log('Character '+charArr[i]+' not found');

          let nfh3 = document.createElement('h4');
          nfh3.innerHTML = ('Character '+charArr[i]+' not found');
          notFound.append(nfh3);

        } else {
          console.log(charData);

          let myDiv = document.createElement("div");
          myDiv.className="cards";

          let nameHeader = document.createElement("h3");
          nameHeader.innerHTML = ("Character: "+charArr[i]);
          myDiv.append(nameHeader);

          let charTitle = document.createElement('p');
          charTitle.innerHTML = ("Title: "+charData[charData.length-1].titles); // TODO - add loop for titles
          myDiv.append(charTitle);

          let spouse = document.createElement('p');
            $.get((charData[charData.length-1].spouse), function(theSpouse){
              spouse.innerHTML = ("Spouse: "+theSpouse.name);
              myDiv.append(spouse);
            })

          charDiv.append(myDiv);
        }

      })
    }
  }


  // HOUSES: LOOP
  var houseDiv = document.getElementById("mainHouseCard");
  var houseArr = ['House Algood', 'House Ashford of Ashford', 'House Baelish of Harrenhal', 'House Stark'];

  function renderHousesPage() {
    for (let i = 0; i < houseArr.length; i++) {
      $.get(('https://www.anapioficeandfire.com/api/houses?name='+houseArr[i]), function(houseData){
        if (houseData == 0) {
          console.log('House '+houseArr[i]+' not found');

          let nfh3 = document.createElement('h4');
          nfh3.innerHTML = (houseArr[i]+' not found');
          notFound.append(nfh3);

        } else {
          console.log(houseData);

          let myHouseDiv = document.createElement("div");
          myHouseDiv.className="cards";

          let houseHeader = document.createElement("h3");
          houseHeader.innerHTML = ("House: "+houseArr[i]);
          myHouseDiv.append(houseHeader);

          let houseRegion = document.createElement('p');
          houseRegion.innerHTML = ("Region: "+houseData[houseData.length-1].region);
          myHouseDiv.append(houseRegion);

          let leader = document.createElement('button');
            $.get((houseData[houseData.length-1].currentLord), function(theLeader){
              leader.innerHTML = ("Leader: "+theLeader.name);
              myHouseDiv.append(leader);
            })

          houseDiv.append(myHouseDiv);
        }

      })
    }
  }


  renderCharPage();
  renderHousesPage();

  function resetCharacters() {
    chars = [];
    document.getElementsByClassName('className')
  }


  // EVENT HANDLERS
  $("#searchButton").click(function(){
     let user_provided_id = $("#searchInput").val();
     if(user_provided_id){
       renderPage({single: user_provided_id});
     }
  })

  $("#clearButton").click(function(){
    $("#searchInput").val("");
    resetCharacters();
    renderPage();
  })

  $(document).on('click', '.heir_link', function(e){
    let my_id = e.target.id;
    renderPage({add:my_id});
    e.preventDefault();
  })


})
