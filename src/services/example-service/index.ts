import CircuitBreaker from 'opossum';
import axios from 'axios';
import { addBreakerToStats } from '../hystrix-metrics';
export class ExampleService {
    private firstService: CircuitBreaker<[string], string>;
    private secondService: CircuitBreaker<[string], string>;

    constructor() {
        const firstBreakerSettings: CircuitBreaker.Options = {
            name: 'firstService',
            errorThresholdPercentage: 120, // for showcase  - never will be open
        };
        this.firstService = new CircuitBreaker(async (name: string) => {
            await axios.get('http://localhost:8082');
            return name;
        }, firstBreakerSettings);

        const secondBreakerSettings: CircuitBreaker.Options = {
            name: 'secondService',
            errorThresholdPercentage: 120, // for showcase
        };
        this.secondService = new CircuitBreaker(async (name: string) => {
            await axios.get('http://localhost:8083');
            return name;
        }, secondBreakerSettings);

        addBreakerToStats(this.firstService);
        addBreakerToStats(this.secondService);
    }

    async getDataFromFirstService(name: string) {
        return this.firstService.fire(name);
    }

    async getDataFromSecondService(name: string) {
        return this.secondService.fire(name);
    }
}
