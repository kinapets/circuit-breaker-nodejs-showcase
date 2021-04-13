import CircuitBreaker from 'opossum';
import { addBreakerToStats } from '../hystrix-metrics';
export class ExampleService {
    private breaker: CircuitBreaker<[string], string>;

    constructor() {
        const breakerSettings: CircuitBreaker.Options = {
            name: 'helloo',
        };
        this.breaker = new CircuitBreaker(async (name: string) => {
            if (Math.random() < 0.2) {
                throw Error('Something went wrong');
            }
            return name;
        }, breakerSettings);

        addBreakerToStats(this.breaker);
    }

    async getExample(name: string) {
        return this.breaker.fire(name);
    }
}
