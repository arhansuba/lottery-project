// File: contracts/MoveLottery/sources/Lottery.move

// Import Aptos Randomness Module
module Randomness {
    native public fun draw_random(index: u64): u64;
}

// Define Lottery Struct
resource struct Lottery {
    lottery_id: u64,
    owner: address,
    participants: vector<address>,
    ticket_price: u64,
    prize_pool: u64,
    yield_pool: u64,
    is_active: bool,
    is_drawn: bool,
}

// Define Lottery Contract
resource contract LotteryContract {
    // Public functions
    public fun init_lottery(lottery_id: u64, ticket_price: u64);
    public fun buy_ticket(sender: address);
    public fun draw_winner() acquires Lottery;
    public fun distribute_prizes(winner: address);
    public fun invest_funds() acquires Lottery;
    public fun check_investments();
    public fun end_lottery();
    
    // Private functions
    private fun calculate_yield() acquires Lottery;
    private fun transfer_yield_earnings();
    
    // Fields
    storage: vector<Lottery>;
    
    // Init Lottery
    public fun init_lottery(lottery_id: u64, ticket_price: u64) {
        let new_lottery = Lottery {
            lottery_id: lottery_id,
            owner: Self::get_caller(),
            participants: Default::default(),
            ticket_price: ticket_price,
            prize_pool: 0,
            yield_pool: 0,
            is_active: true,
            is_drawn: false,
        };
        Self::storage.push(new_lottery);
    }

    // Buy Ticket
    public fun buy_ticket(sender: address) {
        let lottery = Self::storage.get_mut(0);
        assert(lottery.is_active, "Lottery is not active");
        assert(sender != lottery.owner, "Owner cannot buy ticket");

        let ticket_cost = lottery.ticket_price;
        let prize_pool = &mut lottery.prize_pool;
        *prize_pool += ticket_cost;

        let participants = &mut lottery.participants;
        participants.push(sender);
    }

    // Draw Winner
    public fun draw_winner() acquires Lottery {
        let lottery = Self::storage.get_mut(0);
        assert(lottery.is_active, "Lottery is not active");
        assert(lottery.is_drawn == false, "Winner already drawn");

        let num_participants = lottery.participants.len();
        assert(num_participants > 0, "No participants");

        let random_index = Randomness::draw_random(lottery.lottery_id) as usize;
        let winner = lottery.participants.remove(random_index);

        Self::distribute_prizes(winner);
        lottery.is_drawn = true;
    }

    // Distribute Prizes
    public fun distribute_prizes(winner: address) {
        let lottery = Self::storage.get_mut(0);
        let prize_amount = lottery.prize_pool;
        transfer_to_account(winner, prize_amount);

        Self::calculate_yield();
        Self::transfer_yield_earnings();
    }

    // Invest Funds into Yield Farming
    public fun invest_funds() acquires Lottery {
        let lottery = Self::storage.get_mut(0);
        assert(lottery.is_active, "Lottery is not active");

        let yield_amount = lottery.prize_pool;
        let yield_pool = &mut lottery.yield_pool;
        *yield_pool += yield_amount;

        // Here you would integrate with external yield farming protocols
        // This is a placeholder implementation

        Self::check_investments();
    }

    // Check Investments Compliance
    public fun check_investments() {
        let lottery = Self::storage.get_mut(0);
        let yield_pool = lottery.yield_pool;
        
        // Placeholder logic to ensure investments comply with rules
        // You would implement more complex checks here
        assert(yield_pool > 0, "No funds invested");
    }

    // End Lottery
    public fun end_lottery() {
        let lottery = Self::storage.get_mut(0);
        assert(lottery.is_drawn == true, "Winner not drawn yet");

        lottery.is_active = false;
    }

    // Private function to calculate yield
    private fun calculate_yield() acquires Lottery {
        let lottery = Self::storage.get_mut(0);
        let yield_amount = lottery.yield_pool;

        // Placeholder yield calculation logic
        // Integrate with actual yield farming protocols
        // This is a simplified example
        let yield_earned = yield_amount * 0.05; // 5% return for example

        lottery.yield_pool -= yield_earned as u64;
    }

    // Private function to transfer yield earnings
    private fun transfer_yield_earnings() {
        let lottery = Self::storage.get_mut(0);
        let yield_pool = lottery.yield_pool;

        // Placeholder transfer logic
        // Send yield earnings to lottery owner's address
        transfer_to_account(lottery.owner, yield_pool);
    }

    // Utility function to transfer funds to an address
    fun transfer_to_account(recipient: address, amount: u64) {
        // Placeholder transfer function implementation
        // This would depend on your environment and Move capabilities
    }
}
