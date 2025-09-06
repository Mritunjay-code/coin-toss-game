import { Contract, GlobalState } from "@algorandfoundation/algorand-typescript";

// Simple Coin Toss Smart Contract
export class CoinToss extends Contract {

  // Store last result of the coin toss
  lastResult = GlobalState<string>({ key: "lastResult", initialValue: "" });

  // Player chooses Heads or Tails
  toss(guess: string): string {
    // Generate a "random" coin toss (0 = Heads, 1 = Tails)
    // NOTE: For real randomness, you would need an oracle or VRF
    const outcome = Math.floor(Math.random() * 2); 

    let result = outcome === 0 ? "Heads" : "Tails";

    // Save result in global state
    this.lastResult.value = result;

    // Return win/lose message
    if (guess === result) {
      return "You guessed " + guess + " 🎉 Correct!";
    } else {
      return "You guessed " + guess + " ❌ Wrong, it was " + result;
    }
  }

  // Check the last game result
  checkLastResult(): string {
    return this.lastResult.value;
  }
}
