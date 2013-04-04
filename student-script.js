/*************************/
/**** Private Methods ****/
/*************************/

/*
 * Anything that you need for helper/private use should
 * go here.
 *
 */

/*************************/
/****    isis.Game    ****/
/*************************/

/* 
 * This function will be called when the user changes cities
 * 
 * User Story:
 * Whenever you move citites, the game will have to move the player to 
 * the new city and regenerate the items at that location.
 *
 * Hint:
 * Use this.refreshViews() to reload the UI.
 */
isis.Game.prototype.changeCity = function(newCity) {
  
  console.log('trying to change city to ' + newCity.name);
  this.currentCity = newCity;
  for (var i=0; i<newCity.items.length;i++){
    newPrice = newCity.items[i];
    newPrice = newPrice.recalculatePrice();
  }
  this.refreshViews();

}


/*
 * This function will be called when the user buys an item
 *
 * User Story:
 * A player can buy items in a city. Each item has a cost and can be 
 * bought in bulk.
 *
 * Hint:
 * Use prompt() and confirm() to get and valid user input
 */
isis.Game.prototype.buyItem = function(item) {
  console.log('trying to buy ' + item.name);
  var quantity = prompt("How many would you like to buy?");
  var total = quantity * item.currentPrice;
  if (this.agent.money<total){
    alert("YOU CAN NOT AFFORD THIS");
  }
  else{
    confirms = confirm("Confirm purchase of $" + total);
    if (confirms === true){
      // console.log(this.agent.inventory);
      // console.log(this.agent.money);
      this.agent.inventory.push(item, quantity);
      this.agent.money = this.agent.money - total;
      // console.log(this.agent.inventory);
      // console.log(this.agent.money);
    }
  }
}

/**
 * This function will be called when the user sells an item
 *
 * User Story:
 * A player can sell items in a city. Each item has a cost and can be 
 * sold in bulk.
 *
 * Hint:
 * Use prompt() and confirm() to get and valid user input
 * 
 * @params inventoryItem
 * An AgentInventoryItem which contains the info about the item the game
 * is trying to sell.
 */
isis.Game.prototype.sellItem = function(inventoryItem) {
  var value = inventoryItem.item.currentPrice * inventoryItem.quantity;
  console.log('trying to sell ' + inventoryItem.item.name + ', I have ' + inventoryItem.quantity + ' worth $' + value);
  // prompt how many they want to sell
  // confirm quantity & price to be sold at
  // updates inventory (this.agent.inventory.pop)
  // updates this.agent.money
  console.log(inventoryItem);
  console.log(this);
  console.log(this.agent.inventory.item);
  var sell = prompt("How many do you want to sell " + inventoryItem.quantity + " items at a price of $" + inventoryItem.item.currentPrice + "?") ;
  if (sell > inventoryItem.quantity) {
    alert("You don't have that many items to sell BIATCH");
  }
  else {
    confirms = confirm("Are you sure you wanna sell?");
    if (confirms === true) {
      this.agent.inventory.pop(inventoryItem.item, sell);
      this.agent.money = this.agent.money + (sell * inventoryItem.item.currentPrice);
    }
  }

}


/*
 * This function is called when the game is initialized to produce a list of bad
 * things which could happen to our travelling agent. 
 *
 * Make up a few more bad things that could happen to our agent!
 * A few examples:
 *   Customs Fare Hike (5% tax on all current money)
 *   Search & Seizure (-$5000)
 *
 * N.B.
 * The bad thing needs to follow the same format as the temporary bad thing
 */
isis.Game.prototype.initBadThings = function(badThings) {
  badThings.push({
    name: "You got robbed!",
    ohNoes: function(agent) {
      alert("You got robbed! Lose half of your cash");
      agent.money = agent.money/2;
      }
  });
  
  // Fill this one in with a new bad thing which could happen!
  // If you want, copy and paste it to make more bad things!
  badThings.push({
    name: "Name your bad thing!",
    ohNoes: function(agent) {
      alert("Police! Took all your inventory")
      // Your bad thing code goes here
      // console.log(agent.inventory);
      agent.inventory.inventory=[];
      // console.log(agent.inventory);
    }
  });
}

/*************************/
/****    isis.Agent   ****/
/*************************/

/*
 * This method returns the player's rank based on the amount of 
 * money the player has.
 *
 * User Story:
 * If the player has less than $500 then they should be ranked as a 'Rookie'.
 * If the player has more than $500 then they should be ranked as an 'Agent'.
 * If the player has more than $1000 then they should be ranked as a 'Top Agent'.
 * If the player has more than $5000 then they should be ranked as a 'Double-0'.
 */
isis.Agent.prototype.getRank = function(item) { 
  if (this.money < 500) {
    return 'Rookie';
  }
  else if (this.money >= 500 && this.money < 1000) {
    return 'Agent';
  }
  else if (this.money >= 1000 && this.money < 5000) {
    return 'First Class Agent';
  }
  else {
    return 'Double-0s';
  }
}

/*
 * This will initialize the agent for your player. Make sure to change
 * this so that you collect the information from the user instead of
 * hard coding it.
 * 
 * Hint:
 * Use prompt() to get user input.
 */
isis.Agent.prototype.init = function(item) { 
  this.name = prompt("WHAT IS YOUR NAME?");
  this.codename = prompt("What is your NICKNAME?");
}



// This runs the game, this HAS to be at the 
// bottom of the file!
$(function() {
  setTimeout(function() {
    isis.init();
  }, 250);
});