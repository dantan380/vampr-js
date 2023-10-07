class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfVampires = 0;
    let currentVampire = this;

    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      numberOfVampires++;
    }
    return numberOfVampires;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    let numberOfVampiresForCV = 0;
    let numberOfVampiresForOV = 0;
    let currentVampire = this;
    let otherVampire = vampire;

    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      numberOfVampiresForCV++;
    }
    while (otherVampire.creator) {
      otherVampire = otherVampire.creator;
      numberOfVampiresForOV++;
    }
    if (numberOfVampiresForCV < numberOfVampiresForOV) {
      return true;
    } else {
      return false;
    }
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {

  }

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    if (name === this.name) {
      return this;
    }
    for (let descendant of this.offspring) {
      let result = descendant.vampireWithName(name);
      if (result) {
        return result;
      }
    }
    return null;
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let totalVampires = 0;

    for (let descendant of this.offspring) {
      totalVampires += descendant.totalDescendents + 1;
    }

    return totalVampires;
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let totalVampires = [];

    if (this.yearConverted > 1980) {
      totalVampires.push(this);
    }
    
    for (let i = 0; i < this.offspring.length; i++) {
      const millennialDescendants = this.offspring[i].allMillennialVampires;
      totalVampires = totalVampires.concat(millennialDescendants);
    }

    return totalVampires;
  }
}
const gordon = new Vampire("Gordon", 1999);
console.log(gordon.vampireWithName(gordon.name).name);

module.exports = Vampire;

