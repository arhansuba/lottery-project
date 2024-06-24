module Randomness {
    use std::signer;
    use std::vector;
    use std::string;
    use std::table;
    use std::option;
    use std::event;

    struct RandomRequest {
        id: u64,
        requester: address,
        seed: u64,
        completed: bool,
        random_value: u64,
    }

    struct RandomGenerator {
        request_counter: u64,
        requests: table::Table<u64, RandomRequest>,
    }

    event RandomRequestCreated {
        id: u64,
        requester: address,
        seed: u64,
    }

    event RandomValueGenerated {
        id: u64,
        requester: address,
        random_value: u64,
    }

    const ERR_REQUEST_NOT_FOUND: u64 = 1;
    const ERR_REQUEST_ALREADY_COMPLETED: u64 = 2;

    public fun initialize(admin: &signer) {
        let generator = RandomGenerator {
            request_counter: 0,
            requests: table::new<u64, RandomRequest>(),
        };
        move_to(admin, generator);
    }

    public fun create_random_request(requester: &signer, seed: u64): u64 {
        let generator = borrow_global_mut<RandomGenerator>(signer::address_of(requester));
        let id = generator.request_counter;
        let request = RandomRequest {
            id,
            requester: signer::address_of(requester),
            seed,
            completed: false,
            random_value: 0,
        };
        table::add(&mut generator.requests, id, request);
        generator.request_counter = id + 1;

        event::emit<RandomRequestCreated>(&RandomRequestCreated { id, requester: signer::address_of(requester), seed });
        id
    }

    public fun generate_random_value(validator: &signer, request_id: u64) {
        let generator = borrow_global_mut<RandomGenerator>(signer::address_of(validator));
        let request = table::borrow_mut(&mut generator.requests, request_id);

        // Ensure the request is valid and not completed
        assert!(option::is_some(&option::borrow(&request)), ERR_REQUEST_NOT_FOUND);
        assert!(!request.completed, ERR_REQUEST_ALREADY_COMPLETED);

        let seed = request.seed;
        let timestamp = 0; // Placeholder for actual timestamp retrieval
        let random_value = generate_random(seed, timestamp);

        request.random_value = random_value;
        request.completed = true;

        event::emit<RandomValueGenerated>(&RandomValueGenerated { id: request.id, requester: request.requester, random_value });
    }

    public fun get_random_request(requester: address, request_id: u64): &RandomRequest {
        let generator = borrow_global<RandomGenerator>(requester);
        table::borrow(&generator.requests, request_id)
    }

    public fun list_random_requests(): vector<RandomRequest> {
        let generator = borrow_global<RandomGenerator>(signer::address_of(generator));
        let mut requests = vector::empty<RandomRequest>();
        let keys = table::keys(&generator.requests);
        for key in keys {
            let request = table::borrow(&generator.requests, *key);
            vector::push_back(&mut requests, *request);
        }
        requests
    }

    // Internal function to generate a random number
    fun generate_random(seed: u64, timestamp: u64): u64 {
        let combined_value = seed + timestamp;
        let random_value = combined_value % 1000000; // Example range: 0 to 999999
        random_value
    }

    // Helper functions to save and borrow random requests
    fun save_request(id: u64, request: RandomRequest) {
        // Save the request in a global storage map (omitted for brevity)
    }

    fun borrow_request(id: u64): &mut RandomRequest {
        // Borrow the request from the global storage map (omitted for brevity)
    }

    fun generate_id(): u64 {
        // Generate a unique ID (omitted for brevity)
    }
}
