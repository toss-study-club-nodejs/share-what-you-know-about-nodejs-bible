class CustomPromise {
  constructor(executor) {
    this.state = 'pending';
    this.value = undefined;
    this.onResolveCallbacks = [];
    this.onRejectCallbacks = [];

    const resolve = (value) => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
        this.onResolveCallbacks.forEach((callback) => callback(value));
      }
    };

    const reject = (reason) => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.value = reason;
        this.onRejectCallbacks.forEach((callback) => callback(reason));
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    return new CustomPromise((resolve, reject) => {
      const handleFulfilled = (value) => {
        try {
          if (typeof onFulfilled === 'function') {
            const result = onFulfilled(value);
            if (result instanceof CustomPromise) {
              result.then(resolve, reject);
            } else {
              resolve(result);
            }
          } else {
            resolve(value);
          }
        } catch (error) {
          reject(error);
        }
      };

      const handleRejected = (reason) => {
        try {
          if (typeof onRejected === 'function') {
            const result = onRejected(reason);
            if (result instanceof CustomPromise) {
              result.then(resolve, reject);
            } else {
              resolve(result);
            }
          } else {
            reject(reason);
          }
        } catch (error) {
          reject(error);
        }
      };

      if (this.state === 'fulfilled') {
        setTimeout(() => handleFulfilled(this.value));
      } else if (this.state === 'rejected') {
        setTimeout(() => handleRejected(this.value));
      } else {
        this.onResolveCallbacks.push(() => {
          setTimeout(() => handleFulfilled(this.value));
        });
        this.onRejectCallbacks.push(() => {
          setTimeout(() => handleRejected(this.value));
        });
      }
    });
  }

  catch(onRejected) {
    return this.then(undefined, onRejected);
  }

  static resolve(value) {
    return new CustomPromise((resolve) => {
      resolve(value);
    });
  }

  static reject(reason) {
    return new CustomPromise((resolve, reject) => {
      reject(reason);
    });
  }

  static all(promises) {
    return new CustomPromise((resolve, reject) => {
      const results = [];
      let fulfilledCount = 0;

      const handleFulfilled = (index, value) => {
        results[index] = value;
        fulfilledCount++;

        if (fulfilledCount === promises.length) {
          resolve(results);
        }
      };

      promises.forEach((promise, index) => {
        promise.then((value) => handleFulfilled(index, value)).catch(reject);
      });
    });
  }

  static race(promises) {
    return new CustomPromise((resolve, reject) => {
      promises.forEach((promise) => {
        promise.then(resolve).catch(reject);
      });
    });
  }
}
