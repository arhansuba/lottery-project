// File: contracts/AptosRandomnessModule/tests/Randomness.test.move

import 0x1::Signer;
import 0x1::Transaction;
import 0x1::Event;
import 0x1::Randomness;

module RandomnessTest {
    use 0x1::Signer;

    // Test case for draw_random function
    public fun test_draw_random() {
        // Mock input index for testing
        let index: u64 = 123;

        // Call draw_random function to generate a random number
        let random_number = Randomness::draw_random(index);

        // Assert that the generated random number is within the expected range
        assert(random_number >= 0 && random_number < 1000, 101); // Adjust range as per actual implementation

        // Print the generated random number (optional for debugging)
        0x1::println(move(random_number));
    }
}

