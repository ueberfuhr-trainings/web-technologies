let x: number;
x = 5;
x = 6;

class Person {

    constructor(
        public name: string,
        public age: number = 20
    ) {
    }

    sayHello(): void {
        console.log(`Hallo, ich bin ${this.name}.`);
    }

}

let p: Person = new Person('Max');
p.name = 'Max';
console.log(p.age);
p.sayHello();

class GelbeKatze {
    name = 'Katze';
    age = 15;
    sayHello = function() {};
}
p = new GelbeKatze();
p.sayHello();
p = {
    name : '',
    age : 10,
    sayHello() {
    }
}
