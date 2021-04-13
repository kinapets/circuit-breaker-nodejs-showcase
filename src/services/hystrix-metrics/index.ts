// ❗️ It is implementation only for showcase
import CircuitBreaker from 'opossum';
import HystrixStats from 'opossum-hystrix';

const breakers = [];

export const addBreakerToStats = (breaker: CircuitBreaker) => {
    breakers.push(breaker);
};

export const getHystrixStream = () => new HystrixStats(breakers).getHystrixStream();
