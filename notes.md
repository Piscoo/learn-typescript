# TypeScript

## 简介

### TypeScript 的特性

#### 类型系统

从TypeScript的名字就可以看出，**类型**是其最核心的特性。

我们知道，JavaScript是一门非常灵活的编程语言：

- 它没有类型约束，一个变量可能初始化时是字符串，过一会儿又被赋值为数字；
- 由于隐式类型转换的存在，有的变量的类型很难在运行前就确定；
- 基于原型的面向对象编程，使得原型上的属性或方法可以在运行时被修改；
- 函数是JavaScript 中的一等公民，可以赋值给变量，也可以作为参数或返回值；

这种灵活性一方面使得JavaScript蓬勃发展，无所不能；另一方面也使得它的代码质量参差不齐，维护成本高，运行时错误多。

而TypeScript的类型系统，在很大程度上弥补了JavaScript的缺点。



##### TypeScript是静态类型

类型系统按照**类型检查的时机**来分类，可以分为动态类型和静态类型。

动态类型是指在运行时才会进行类型检查，这种语言的类型错误往往会导致运行时的错误。JavaScript是一门解释型语言，没有编译阶段，所以它是动态类型。

静态类型是指编译阶段就能确定每个变量的类型，这种语言的类型错误往往会导致语法错误。TypeScript在运行前需要先编译为JavaScript，而在编译阶段就会进行类型检查，所以TypeScript是静态类型。



##### TypeScript是弱类型

类型系统按照*是否允许隐式类型转换*来分类，可以分为强类型和弱类型。

以下这段代码不管是在JavaScript中还是在TypeScript中都是可以正常运行的，运行时数字1会被隐式类型转换为字符串'1'，加号'+'被识别为字符串拼接，所以打印出结果是字符串'11'。

```javascript
console.log(1 + '1');
// 打印出字符串 '11'
```

TypeScript 是完全兼容JavaScript的，它不会修改JavaScript运行时的特性，所以它们都是弱类型。

作为对比，Python是强类型，以下代码会在运行时报错：

```python
print(1 + '1')
#TypeError: unsupported operand type(s) for +: 'int' and 'str'
```

> 强/弱是相对的，Python 在处理整型和浮点型相加时，会将整型隐式转换为浮点型，但是这并不影响Python是强类型的结论，因为大部分情况下Python并不会进行隐式类型转换。相比而言，JavaScript和TypeScript中不管加号两边是什么类型，都可以通过隐式类型转换计算出一个结果——而不是报错——所以JavaScript和TypeScript都是弱类型。

> 虽然TypeScript不限制加号两侧的类型，但是我们可以借助TypeScript提供的类型系统，以及ESLint提供的代码检查功能，来限制加号两侧必须为相同的类型。这在一定程度上使得TypeScript向**强类型**更近了一步——当然，这种限制是可选的。

这样的类型系统体现了TypeScript的核心设计理念：在完整保留JavaScript运行时行为的基础上，通过引入静态类型系统来提高代码的可维护性，减少可能出现的BUG。



##### 适用于任何规模

TypeScript非常适用于大型项目，类型系统可以为大型项目带来更高的可维护性以及更少的BUG。

TypeScript还可以和JavaScript共存。这意味着如果你有一个使用JavaScript开发的旧项目，又想使用TypeScript的特性，那么你不需要急着把整个项目都迁移到TypeScript，你可以使用TypeScript编写新文件，然后在后续更迭中逐步迁移旧文件。

##### 与标准同步发展

TypeScript的另一个重要的特性就是坚持与ECMAScript标准同步发展。

除了实现ECMAScript标准之外，TypeScript团队也推进了诸多语法提案，比如可选链次操作符(`?.`)、空值合并操作符(`??`)、Throw表达式、正则匹配索引等。



#### 总结

##### 什么是TypeScript？

- TypeScript是添加了类型系统的JavaScript，适用于任何规模的项目。
- TypeScript是一门静态类型、弱类型的语言。
- TypeScript是完全兼容JavaScript的，它不会修改JavaScript运行时的特性。
- TypeScript可以编译为JavaScript，然后运行在浏览器、Node.js等任何能运行JavaScript的环境中。
- TypeScript拥有很多编译选项，类型检查的严格程度由你决定。
- TypeScript可以和JavaScript共存，这意味着JavaScript项目能够渐进式的迁移到TypeScript。
- TypeScript 增强了编辑器的功能，提供了代码补全、接口提示、跳转到定义、代码重构等能力。
- TypeScript拥有活跃的社区，大多数常用的第三方库都提供了类型声明。
- TypeScript与标准同步发展，符合最新的ECMAScript标准。

### 安装TypeScript

使用命令行工具安装TypeScript的方法如下：

`npm install -g typescript`

以上命令会在全局环境下安装`tsc`命令，安装完成之后，就可以在任何地方执行`tsc`命令。

编译一个TypeScript文件的命令是：

`tsc xxx.ts`

统一约定使用TypeScript编写的文件以`.ts`为后缀，用TypeScript 编写React时，以`.tsx`为后缀。



## 基础

### 原始数据类型

JavaScript的类型分为两种：原始数据类型(Primitive data types)和对象类型(Object types)。

原始数据类型包括：布尔值、数值、字符串、`null`、`undefined`以及ES6中的新类型`Symbol`和ES10中的新类型`BigInt`。

#### 布尔值

布尔值是最基础的数据类型，在TypeScript中，使用`boolean`定义布尔值类型：

```ts
let isDone: boolean = false;
```

注意，使用构造函数`Boolean`创造的对象不是布尔值：

```ts
let createdByNewBoolean: boolean = new Boolean(1);
// Type 'Boolean' is not assignable to type 'boolean'
// 'boolean' is a primitive, but 'Boolean' is a wrapper object. Prefer using 'boolean' when poosible.
```

事实上，`new Boolean()`返回的是一个`Boolean`对象；

```ts
let createdByNewBoolean: Boolean = new Boolean(1);
```

直接调用`Boolean`也可以返回一个`boolean`类型：

```ts
let createdByBoolean: boolean = Boolean(1);
```

在TypeScript中，`boolean`是JavaScript中的基本类型，而`Boolean`是JavaScript中的构造函数。其他基本类型（除了`null`和`undefined`）一样。

#### 数值

使用`number`定义数值类型：

```ts
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;
// ES6 中的二进制表示法
let binaryLiteral: number = 0b1010;
// ES6 中的八进制表示法
let octalLiteral: number = 0o744;
let notANumber: number = NaN;
let infinityNumber: number = Infinity;
```

编译结果：

```ts
var decLiteral = 6;
var hexLiteral = 0xf00d;
// ES6 中的二进制表示法
var binaryLiteral = 10;
// ES6 中的八进制表示法
var octalLiteral = 484;
var notANumber = NaN;
var infinityNumber = Infinity;
```

其中 `0b1010`和`0o744`是ES6中的二进制和八进制表示法，它们会被编译为十进制数字。

#### 字符串

使用`string`定义字符串类型：

```ts
let myName: string = 'Pisco';
let myAge: number = 25;
// 模版字符串
let sentence: string = `Hello, my name is ${myName}. I'll be ${myAge + 1} years old next month.`;
```

编译结果：

```ts
var myName = 'Pisco';
var myAge = 25;
// 模版字符串
var sentence = "Hello, my name is " + myName + ". I'll be" + (myAge + 1) + " years old next month.";
```

#### 空值

JavaScript没有空值(Void)的概念，在TypeScript中，可以用`void`来表示没有任何返回值的函数：

```ts
function alertName(): void {
  alert('My name is Pisco');
}
```

声明一个`void`类型的变量没什么用，因为你只能将它赋值为`undefined`和`null`：

```ts
let unusable: void = null;
```

#### Null 和 Undefined

在TypeScript中，可以使用`null`和`undefined`来定义这两个原始数据类型：

```ts
let u: undefined = undefined;
let n: null = null;
```

与`void`的区别是，`undefined`和`null`是所有类型的子类型。也就是说`undefined`类型的变量，可以赋值给`number`类型的变量：

```ts
//这样不会报错
let num: number = undefined;
// 这样也不会报错
let u: undefined;
let num1: number = u;
```

而`void`类型的变量不能赋值给`number`类型的变量：

```ts
let u: void;
let num: number = u;
// Type 'void' is not assignable to type 'number'.
```

### 任意值

任意值(Any)用来表示允许赋值为任意类型。

#### 什么事任意值类型

如果一个普通类型，在赋值过程中改变类型是不被允许的：

```ts
let myNumber: string = 'eight';
myNumber = 8;
//  index.ts(2,1): error TS2322: Type 'number' is not assignable to type 'string'.
```

但如果是`any`类型，则允许被赋值为任意类型。

```ts
let myNumber: any = 'eight';
myNumber = 8;
```

#### 任意值的属性和方法

在任意值上访问任何属性都是允许的：

```ts
let anyThing: any = 'hello';
console.log(anyThing.myName);
console.log(anyThing.myName.firstName);
```

也允许调用任意方法：

```ts
let anyThing: any = 'Pisco';
anyThing.setName('Smith');
anyThing.setName('Smith').sayHello();
anyThing.myName.setFirstName('Pisco')
```

可以认为，声明一个变量为任意值之后，对它的任何操作，返回的内容的类型都是任意值。

#### 未声明类型的变量

变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型：

```ts
let something;
something = 'seven';
something = 7;
something.setName("Pisco");
```

等价于：

```ts
let something: any;
something = 'seven';
something = 7;
something.setName('Pisco');
```

### 类型推论

如果没有明确的指定类型，那么TypeScript会依照类型推论(Type Inference)的规则推断出一个类型。

#### 什么是类型推论

以下代码虽然没有指定类型，但是会在编译的时候报错：

```ts
let myNumber = 'eight';
myNumber = 8;
// index.ts(2,1): error TS2322: Type 'number' is not assignable to type 'string'.
```

事实上，它等价于：

```ts
let myNumber: string = 'eight';
myNumber = 8;
// index.ts(2,1): error TS2322: Type 'number' is not assignable to type 'string'.
```

TypeScript会在没有明确的指定类型的时候推测出一个类型，这就是类型推论。

如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成`any`类型而完全不被类型检查：

```ts
let something;
something = 'seven';
something = 7;
```

### 联合类型

联合类型(Union Types)表示取值可以为多种类型中的一种。

```ts
let myNumber: string | number;
myNumber = 'eight';
myNumber = 8;

myNumber = true;
// Type 'boolean' is not assignable to type 'string | number'.
//   Type 'boolean' is not assignable to type 'number'.
```

联合类型使用`|`分隔每个类型。

变量允许的类型只能是声明了的类型中的一种，不能是其他类型。

#### 访问联合类型的属性或方法

当TypeScript不确定一个联合类型的变量到底是哪个类型的时候，我们**只能访问此联合类型的所有类型里共有的属性或方法**：

```ts
function getLength(something: string | number): number {
  return something.length;
}
// index.ts(2,22): error TS2339: Property 'length' does not exist on type 'string | number'.
//   Property 'length' does not exist on type 'number'.
```

上例中，`length`不是`string`和`number`的共有属性，所以会报错。

访问`string`和`number`的共有属性是没问题的：

```ts
function getString(something: string | number): string {
  return something.toString();
}
```

联合类型的变量在被赋值的时候，会根据类型推论的规则推断出一个类型：

```ts
let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';
console.log(myFavoriteNumber.length); // 5
myFavoriteNumber = 7;
console.log(myFavoriteNumber.length); // 编译时报错
// index.ts(5,30): error TS2339: Property 'length' does not exist on type 'number'.
```

上例中，第二行的 `myFavoriteNumber` 被推断成了 `string`，访问它的 `length` 属性不会报错。

而第四行的 `myFavoriteNumber` 被推断成了 `number`，访问它的 `length` 属性时就报错了。

### 接口(Interfaces)

在TypeScript中，我们使用(Interfaces)来定义对象的类型。

#### 什么是接口

在面对对象语言中，接口是一个很重要的概念，它是对行为的抽象，而具体如何行动需要由类去实现。

TypeScript中的接口是一个非常灵活的概念，除了可用于对类的一部分行为进行抽象以外，也常用于对*对象的形状*进行描述。

#### 简单的例子

```ts
interface Person {
  name: string;
  age: number;
}
let Pisco: Person = {
  name: 'Pisco',
  age: 25
};
```

上面的例子中，我们定义了一个接口`Person`，接着定义了一个变量`Pisco`，它的类型是`Person`。这样。我们就约束了`Pisco`的形状必须和接口`Person`一致。

接口一般首字母大写。

定义的变量比接口少了一些属性是不允许的， 多一些属性也是不允许的。也就是说，***赋值的时候，变量的形状必须和接口的形状保持一致。***

#### 可选属性

有时我们希望不要完全匹配一个形状，那么可以用可选属性：

```ts
interface Person {
  name: string;
  age?: number;
}
let tom: Person = {
  name: 'Tom';
}
let pisco: Person = {
  name: 'Pisco',
  age: 25
}
```

可选属性的含义是该属性可以不存在。

但是**仍然不允许添加未定义的属性。**

#### 任意属性

有时候我们希望一个接口允许有任意的属性，可以使用如下方式：

```ts
interface Person {
  name: string;
  age?: number;
  [propName: string]: any;
}
let pisco: Person = {
  name: 'Pisco',
  gender: 'male'
};
```

使用 `[propName: string]` 定义了任意属性取 `string` 类型的值。

需要注意的是，***一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集***：

```ts
interface Person {
    name: string;
    age?: number;
    [propName: string]: string;
}

let pisco: Person = {
    name: 'Pisco',
    age: 25,
    gender: 'male'
};

// index.ts(3,5): error TS2411: Property 'age' of type 'number' is not assignable to string index type 'string'.
// index.ts(7,5): error TS2322: Type '{ [x: string]: string | number; name: string; age: number; gender: string; }' is not assignable to type 'Person'.
//   Index signatures are incompatible.
//     Type 'string | number' is not assignable to type 'string'.
//       Type 'number' is not assignable to type 'string'.
```

上例中，任意属性的值允许是 `string`，但是可选属性 `age` 的值却是 `number`，`number` 不是 `string` 的子属性，所以报错了。

另外，在报错信息中可以看出，此时 `{ name: 'Tom', age: 25, gender: 'male' }` 的类型被推断成了 `{ [x: string]: string | number; name: string; age: number; gender: string; }`，这是联合类型和接口的结合。

一个接口中只能定义一个任意属性。如果接口中有多个类型的属性，则可以在任意属性中使用联合类型：

```ts
interface Person {
  name: string;
  age?: number;
  [propName: string]: string | number;
}
let pisco: Person = {
  name: 'Pisco',
  age: 25,
  gender: 'male'
};
```

#### 只读属性

有时候我们希望对象中的一些字段只能在创建的时候被赋值，那么可以用`readonly`定义只读属性：

```ts
interface Person {
  readonly id: number;
  name: string;
  age?: number;
  [propName: string]: any;
}
let pisco: Person = {
  id: 2512,
  name: 'Pisco',
  age: 25,
  gender: 'male'
};
pisco.id = 5252;
// index.ts(14,5): error TS2540: Cannot assign to 'id' because it is a constant or a read-only property.
```

上例中，使用`readonly`定义的属性`id`初始化后，又被赋值了，所以报错了。

**注意，只读的约束存在于第一次给<u>对象</u>赋值的时候，而不是第一次给<u>只读属性</u>赋值的时候**：

```ts
interface Person {
  readonly id: number;
  name: string;
  age?: number;
  [propName: string]: any;
}
let pisco: Person = {
  name: 'Pisco',
  age: 25
};
pisco.id = 2512;
// index.ts(8,5): error TS2322: Type '{ name: string; gender: string; }' is not assignable to type 'Person'.
//   Property 'id' is missing in type '{ name: string; gender: string; }'.
// index.ts(13,5): error TS2540: Cannot assign to 'id' because it is a constant or a read-only property.
```

上例中，报错信息有两处：

第一处是在对 `pisco` 进行赋值的时候，没有给 `id` 赋值。

第二处是在给 `pisco.id` 赋值的时候，由于它是只读属性，所以报错了。



### 数组的类型

在TypeScript中，数组的类型有多种定义方式，比较灵活。

#### 类型 + 方括号 表示法

最简单的方法是使用*类型 + 方括号* 来表示数组：

`let fibonacci: number[] = [1, 2, 3, 4];`

数组项中**不允许**出现其他的类型：

````ts
let fibonacci: number[] = [1, '2', 3, 4];
// Type 'string' is not assignable to type 'number'.
````

数组的一些方法的参数也会根据数组在定义时约定的类型进行限制：

```ts
let fibonacci: number[] = [1, 2, 3];
fibonacci.push('8');
// Argument of type '"8"' is not assignable to parameter of type 'number'.
```

#### 数组泛型

我们也可以使用数组泛型(Array Generic) `Array<elemType>`来表示数组：

`let fibonacci: Array<number> = [1, 2, 3, 4];`

#### 用接口表示数组

接口也可以用来描述数组

```ts
interface NumberArray {
  [index: number]: number;
}
let fibonacci: NumberArray = [1, 2, 3, 4];
```

`NumberArray`表示：只要索引的类型是数字时，值的类型必须是数字。

虽然接口也可以用来描述数组，但是我们一般不会这么做，因为这种方式比前两种方式复杂的多。

不过有一种情况例外，就是它常用来表示类数组。

#### 类数组

类数组(Array-like Object)不是数组类型，比如`arguments `:

```ts
function sum() {
  let args: number[] = arguments;
}
// Type 'IArguments' is missing the following properties from type 'number[]': pop, push, concat, join, and 24 more.
```

上例中，`arguments`实际上是一个类数组，不能用普通的数组方式来描述，而应该用接口：

```tst
function sum() {
  let args: {
    [index: number]: number;
    length: number;
    callee: Function;
  } = arguments;
}
```

在上例中，我们除了约束当前索引的类型是数字时，值的类型必须是数字外，也约束了它还有 `length`和`callee`两个属性。

事实上常用的类数组都有自己的接口定义，如`IArguments`，`NodeList`，`HTMLCollection`等：

```ts
function sum() {
  let args: IArguments = arguments;
}
```

其中`IArguments`是TypeScript中定义好了的类型，它实际上就是;

```ts
interface IArgumets {
  [index: number]: any;
  length: number;
  callee: Function;
}
```

#### any 在数组中的应用

一个比较常见的做法是，用`any`表示数组中允许出现任意类型：

`let list: any[] = ['Pisco', 25, {sport: 'basketball'}];`

### 函数的类型

####  函数声明

在JavaScript中，有两种常见的定义函数的方式——函数声明(Function Declaration)和函数表达式(Functiton Expression)：

```ts
// Function Declaration
function sum(x, y) {
  return x + y;
}
// Function Expression
let mySum = function(x, y) {
  return x + y;
};
```

一个函数有输入和输出，要在TypeScript中对其进行约束，需要把输入和输出都考虑到，其中函数声明的类型定义较简单：

```ts
function sum(x: number, y: number): number {
  return x + y;
}
```

**不允许传入多于或者少于定义的参数个数**

#### 函数表达式

如果要我们现在写一个对函数表达式(Function Expression)的定义，可能会写成这样：

```ts
let mySum = function(x: number, y: number): number {
  return x + y;
};
```

这是可以通过编译的，不过事实上，上面的代码只对等号右侧的匿名函数进行了类型定义，而等号左边的`mySum`，是通过赋值操作进行类型推论而推断出来的。如果需要我们手动给`mySum`添加类型，应该是这样：

```ts
let mySum: (x: number, y: number) => number = function(x: number, y: number): number {
  return x + y;
};
```

注意不要混淆了TypeScript的`=>`和ES6中的`=>`。

在TypeScript的类型定义中，`=>`用来表示函数的定义，左边是输入的类型，需要用括号括起来，右边是输出的类型。ES6中是箭头函数。

#### 用接口定义函数的形状

我们也可以用接口的方式来定义一个函数需要符合的形状：

```ts
interface SearchFunc {
  (source: string, subString: string): boolean;
}
let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
  return source.search(subString) !== -1;
}
```

采用函数表达式 | 接口定义函数的方式时，对等号左侧进行类型限制，可以保证以后对函数名赋值时保证参数个数、参数类型、返回值类型不变。

#### 可选参数

与接口中的可选属性类似，我们用`?`表示可选的参数：

```ts
function buildName(firstName: string, lastName?: string) {
  if(lastName) {
    return firstName + " " + lastName;
  } else {
    return firstName;
  }
}
let tomcat = buildName('Tom', 'Cat');
let tom = buildName('Tom');
```

需要注意的是，可选参数必须在必需参数后面，也就是说，**可选参数后面不允许再出现必需参数**。

```ts
function buildName(lastName?: string, firstName: string) {
  // xxx
}
// index.ts(1,40): error TS1016: A required parameter cannot follow an optional parameter.
```

#### 参数默认值

在ES6中，我们允许给函数的参数添加默认值，**TypeScript会将添加了默认值的参数识别为可选参数**：

```ts
function buildName(firstName: string, lastName: string = 'Cat') {
  return firstName + ' ' + lastName;
}
let tomcat = buildName('Tom', 'Cat');
let tom = buildName('Tom');
// 此时就不受可选参数必须在必需参数后面的限制了
function randomName(firstName: string = 'Tom', lastName: string) {
  return firstName + ' ' + lastName;
}
let pisco = randomName('Pisco', 'Smith');
let lisa = randomName(undefined, 'Lisa');
```

#### 剩余参数

ES6中，可以使用`...rest`的方式获取函数中的声誉参数：

```ts
function push(array, ...items) {
  items.forEach(function(item) {
    array.push(item);
  });
}
let a: any[] = [];
push(a, 1, 2, 3);
```

事实上，`items`是一个数组。所以我们可以用数组的类型来定义它：

```ts
function push(array: any[], ...items: any[]) {
  items.forEach(function(item) {
    array.push(item);
  });
}
let a = [];
push(a, 1, 2, 3);
```

注意：rest参数只能是最后一个参数。

#### 重载

重载允许一个函数接受不同数量或类型的参数时，作出不同的处理。

比如，我们实现一个函数`reverse`，输入数字`123`的时候，输出`321`，输入字符串`hello`的时候，输出`olleh`。

利用联合类型，我们可以：

```ts
function reverse(x: number | string): number | string | void {
  if(typeof x === 'number') {
    return Number(x.toString().split('').reverse().join(''));
  } else if(typeof x === 'string') {
    return x.split('').reverse().join('');
  }
}
```

**然而这样有一个缺点，就是不能够精确的表达。当输入为数字时，输出也应该为数字；输入为字符串时，输出也应该为字符串。**

这时，我们可以用重载定义多个`reverse`的函数类型：

```ts
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string | void {
  if(typeof x === 'number') {
    return Number(x.toString().split('').reverse().join(''));
  } else if(typeof x === 'string') {
    return x.split('').reverse().join('');
  }
}
```

上例中，我们重复定义了多次函数`reverse`，前几次都是函数定义，最后一次是函数实现。在编辑器的代码提示中，可以正确的看到前两个提示。

注意，TypeScript会优先从最前面的函数定义开始匹配，所以多个函数定义如果有包含关系，需要优先把精确的定义写在前面。

### 类型断言

类型断言(Type Assertion)可以用来手动指定一个值的类型。

#### 语法

`值 as 类型  || <类型>值`

在 tsx 语法中必须使用前者，即`值 as 类型`。

形如`<Foo>`的语法在 tsx 中表示的是一个`ReactNode`，在 ts 中除了表示类型断言之外，也可能是表示一个泛型。

所以建议大家在使用类型断言时，统一使用`值 as 类型`这样的语法。

#### 类型断言的用途

类型断言的常见用途有以下几种：

##### 1. 将一个联合类型断言为其中一个类型

当TypeScript不确定一个联合类型的变量到底是哪个类型的时候，我们**只能访问此联合类型的所有类型中共有的属性或方法**

```ts
interface Cat {
  name: string;
  run(): void;
}
interface Fish {
  name: string;
  swim(): void;
}

function getName(animal: Cat | Fish) {
  return animal.name;
}
```

而有时候，我们需要在不确定类型的时候就访问其中一个类型特有的属性或方法，比如：

```ts
interface Cat {
  name: string;
  run(): void;
}
interface Fish {
  name: string;
  swim(): void;
}
function isFish(animal: Cat | Fish) {
  if(typeof animal.swim === 'function') {
    return true;
  }
  return false;
}
// index.ts:11:23 - error TS2339: Property 'swim' does not exist on type 'Cat | Fish'.
//   Property 'swim' does not exist on type 'Cat'.
```

上面的例子中，获取`animal.swim`的时候会报错。

此时可以使用类型断言，将`animal`断言成`Fish`：

```ts
interface Cat {
  name: string;
  run(): void;
}
interface Fish {
  name: string;
  swim(): void;
}
function isFish(animal: Cat | Fish) {
  if(typeof (animal as Fish).swim === 'function') {
    return true;
  }
  return false;
}
```

这样就可以解决访问`animal.swim`报错的问题了。

但是，类型断言只能够"欺骗"TypeScript编译器，无法避免运行时的错误，反而滥用类型断言可能会导致运行时错误：

```ts
interface Cat {
  name: string;
  run(): void;
}
interface Fish {
  name: string;
  swim(): void;
}
function swim(animal: Cat | Fish) {
  (animal as Fish).swim();
}
const tom: Cat = {
  name: 'Tom',
  run() {
    console.log('run')
  }
};
swim(tom);
// Uncaught TypeError: animal.swim is not a function.
```

上述例子在编译时不会报错，但是在运行的时候会报错：

`Uncaught TypeError: animal.swim is not a function`

原因是`(animal as Fish).swim()`这段代码隐藏了`animal`可能为`Cat`的情况，将`animal`直接断言为`Fish`了，而TypeScript编译器信任了我们的断言，故在调用`swim()`时没有编译错误。

可是`swim`函数接受的参数是`Cat | Fish`，一旦传入的参数是`Cat`类型的变量，由于`Cat`没有`swim`方法，就会导致运行时的错误。

总之，使用类型断言时一定要格外小心，尽量避免断言后调用方法或引用深层属性，以减少不必要的运行时错误。

##### 2. 将一个父类断言为更加具体的子类

当类之间有继承关系时，类型断言也很常见的：

```ts
class ApiError extends Error {
  code: number = 0;
}
class HttpError extends Error {
  statusCode: number = 200;
}
function isApiError(error: Error) {
  if(typeof (error as ApiError).code === 'number') {
    return true;
  }
  return false;
}
```

上面的例子中，我们声明了函数`isApiError`，它用来判断传入的参数是不是`ApiError`类型，为了实现这样一个函数，它的参数的类型肯定得是比较抽象的父类`Error`，这样的话这个函数就能接受`Error`或它的子类作为参数了。

但是由于父类`Error`中没有`code`属性，故直接获取`error.code`会报错，需要使用类型断言获取`(error as ApiError).code`。

大家可能会注意到，在这个例子中有一个更合适的方式来判断是不是`ApiError`，那就是使用`instanceof`：

```ts
class ApiError extends Error {
    code: number = 0;
}
class HttpError extends Error {
    statusCode: number = 200;
}

function isApiError(error: Error) {
    if (error instanceof ApiError) {
        return true;
    }
    return false;
}
```

上面的例子中，确实使用`instanceof`更加合适，因为`ApiError`是一个JavaScript的类，能够通过`instanceof`来判断`error`是否是它的实例。

但是有的情况下 `ApiError`和 `HttpError` 不是一个真正的类，而只是一个TypeScript的接口，接口是一个类型，不是一个真正的值，它在编译结果中会被删除，当然就无法使用`instanceof`来做运行时的判断了：

```ts
interface ApiError extends Error {
  code: number;
}
interface HttpError extends Error {
  statusCode: number;
}
function isApiError(error: Error) {
  if(error instanceof ApiError) {
    return true;
  }
  return false;
}
// index.ts:9:26 - error TS2693: 'ApiError' only refers to a type, but is being used as a value here.
```

此时就只能用类型断言，通过判断是否存在`code`属性，来判断传入的参数是不是`ApiError`了：

```ts
interface ApiError extends Error {
  code: number;
}
interface HttpError extends Error {
  statusCode: number;
}
function isApiError(error: Error) {
  if(typeof (error as ApiError).code === 'number') {
    return true;
  }
  return false;
}
```

##### 3. 将任何一个类型断言为 `any`

理想情况下，TypeScript的类型类型运转良好，每个值的类型都具体而精确。

当我们引用一个在此类型上不存在的属性或方法时，就会报错：

```ts
const foo: number = 1;
foo.length = 1;
// index.ts:2:5 - error TS2339: Property 'length' does not exist on type 'number'.
```

上面的例子中，数字类型的变量`foo`上是没有`length`属性的，故TypeScript给出了相应的错误提示。

这种错误提示非常有用。

但有的时候，我们非常确定这段代码不会出问题，比如：

```ts
window.foo = 1;
// index.ts:1:8 - error TS2339: Property 'foo' does not exist on type 'Window & typeof globalThis'.
```

上面的例子中，我们需要将 `window` 上添加一个属性 `foo`，但 TypeScript 编译时会报错，提示我们 `window` 上不存在 `foo` 属性。

此时我们可以用`as any`临时将`window`断言为`any`类型：

`(window as any).foo = 1;`

在`any`类型的变量上，访问任何属性都是允许的。

需要注意的是，将一个变量断言为`any`可以说是解决TypeScript中类型问题的最后一个手段。

**它极有可能掩盖了真正的类型错误，所以如果不是非常确定，就不要使用`as any`**

总之，**一方面不能滥用`as any`，另一方面也不要完全否定它的作用，我们需要在类型的严格性和开发的便利性之间掌握平衡**（这也是TypeScript的设计理念之一），才能发挥出TypeScript最大的价值。

##### 4. 将`any`断言为一个具体的类型

在日常开发中，我们不可避免的需要处理`any`类型的变量，遇到`any`类型的变量时，我们可以选择无视，任由其滋生出更多的`any`.

也可以选择改进它，通过类型断言及时的把`any`断言为精确的类型，亡羊补牢，使我们的代码向着高可维护性的目标发展。

例如，旧代码中有个`getCacheData`函数，它的返回值是`any`：

```ts 
function getCacheData(key: string): any {
  return (window as any).cache[key];
}
```

那么我们在使用它时，最好能够将调用了它之后的返回值断言成一个精确的类型，这样就方便了后续的操作：

```ts
function getCacheData(key: string): any {
  return (window as any).cache[key];
}
interface Cat {
  name: string;
  run(): void;
}
const tom = getCacheData('tom') as Cat;
tom.run();
```

上面的例子中，我们调用完`getCacheData`之后，立即将它断言为`Cat`类型。这样的话明确了`tom`的类型，后续对`tom`的访问时就有了代码补全或提示，提高了代码的可维护性。

#### 类型断言的限制

从前面的例子中，我们可以总结出：

- 联合类型可以被断言为其中一个类型
- 父类可以被断言为子类
- 任何类型都可以被断言为`any`
- `any`可以被断言为任何类型

但是，并不是任何一个类型都可以被断言为任何另一个类型

具体来说，若 A 兼容 B，那么 A 能够被断言为 B，B 也能够被断言为 A。

通过一个简化的例子，来理解类型断言的限制：

```ts
interface Animal {
  name: string;
}
interface Cat {
  name: string;
  run(): void;
}
let tom: Cat = {
  name: 'Tom',
  run: () => { console.log('run') }
};
let animal: Animal = tom;
```

TypeScript是结构类型系统，类型之间的对比只会比较它们最终的结构，而忽略它们定义时的关系。

在上面的例子中，`Cat`包含了`Animal`中的所有属性，除此之外，它还有一个额外的方法`run`。TypeScript并不关心`Cat`和`Animal`之间定义时是什么关系，而只会看它们最终的结构有什么关系——所以它与`Cat extends Animal`是等价的：

```ts
interface Animal {
  name: string;
}
interface Cat extends Animal {
  run(): void;
}
```

那么也不难理解为什么`Cat`类型的`tom`可以赋值给`Animal`类型的`animal`了——就像面向对象编程中我们可以把子类的实例赋值给父类的变量。

换成TS专业的说法就是 `Animal`兼容`Cat`。

当`Animal`兼容`Cat`时，它们就可以互相进行类型断言了：

```ts
interface Animal {
  name: string;
}
interface Cat {
  name: string;
  run(): void;
}
function testAnimal(animal: Animal) {
  return (animal as Cat);
}
function testCat(cat: Cat) {
  return (cat as Animal);
}
```

这样的设计其实也很容易就能理解：

- 允许 `animal as Cat` 是因为「父类可以被断言为子类」，这个前面已经学习过了
- 允许 `cat as Animal` 是因为既然子类拥有父类的属性和方法，那么被断言为父类，获取父类的属性、调用父类的方法，就不会有任何问题，故「子类可以被断言为父类」

综上所述：

- 联合类型可以被断言为其中一个类型
- 父类可以被断言为子类
- 任何类型都可以被断言为`any`
- `any`可以被断言为任何类型
- 要使得 A 能够被断言为 B，只需要 A兼容B或者B兼容A即可。

其实前四种情况都是最后一个的特例。

#### 类型断言 vs 类型转换

类型断言只会影响TS编译时的类型，类型断言语句在编译结果中会被删除：

```ts
function toBoolean(something: any): boolean {
  return something as boolean;
}
toBoolean(1);
// 返回值为1
```

在上面的例子中，将`something`断言为`boolean`虽然可以通过编译，但是并没有什么用，代码在编译后会变成：

```ts
function toBoolean(something) {
  return something;
}
toBoolean(1);
```

所以类型断言不是类型转换，不会真的影响到变量的类型。

若要进行类型转换，需要直接调用类型转换的方法：

```ts
function toBoolean(something: any): boolean {
  return Boolean(something);
}
toBoolean(1);
// 返回true
```

#### 类型断言 vs 类型声明

在这个例子中：

```ts
function getCacheData(key: string): any {
    return (window as any).cache[key];
}

interface Cat {
    name: string;
    run(): void;
}

const tom = getCacheData('tom') as Cat;
tom.run();
```

我们使用 `as Cat` 将 `any` 类型断言为了 `Cat` 类型。

但实际上还有其他方式可以解决这个问题：

```ts
function getCacheData(key: string): any {
    return (window as any).cache[key];
}

interface Cat {
    name: string;
    run(): void;
}

const tom: Cat = getCacheData('tom');
tom.run();
```

上面的例子中，我们通过类型声明的方式，将 `tom` 声明为 `Cat`，然后再将 `any` 类型的 `getCacheData('tom')` 赋值给 `Cat` 类型的 `tom`。

这和类型断言是非常相似的，而且产生的结果也几乎是一样的——`tom` 在接下来的代码中都变成了 `Cat` 类型。

它们的区别，可以通过这个例子来理解：

```ts
interface Animal {
    name: string;
}
interface Cat {
    name: string;
    run(): void;
}

const animal: Animal = {
    name: 'tom'
};
let tom = animal as Cat;
```

在上面的例子中，由于 `Animal` 兼容 `Cat`，故可以将 `animal` 断言为 `Cat` 赋值给 `tom`。

但是若直接声明 `tom` 为 `Cat` 类型：

```ts
interface Animal {
    name: string;
}
interface Cat {
    name: string;
    run(): void;
}

const animal: Animal = {
    name: 'tom'
};
let tom: Cat = animal;

// index.ts:12:5 - error TS2741: Property 'run' is missing in type 'Animal' but required in type 'Cat'.
```

则会报错，不允许将 `animal` 赋值为 `Cat` 类型的 `tom`。

这很容易理解，`Animal` 可以看作是 `Cat` 的父类，当然不能将父类的实例赋值给类型为子类的变量。

深入的讲，它们的核心区别就在于：

- `animal` 断言为 `Cat`，只需要满足 `Animal` 兼容 `Cat` 或 `Cat` 兼容 `Animal` 即可
- `animal` 赋值给 `tom`，需要满足 `Cat` 兼容 `Animal` 才行

但是 `Cat` 并不兼容 `Animal`。

而在前一个例子中，由于 `getCacheData('tom')` 是 `any` 类型，`any` 兼容 `Cat`，`Cat` 也兼容 `any`，故

```ts
const tom = getCacheData('tom') as Cat;
```

等价于

```ts
const tom: Cat = getCacheData('tom');
```

知道了它们的核心区别，就知道了类型声明是比类型断言更加严格的。

所以为了增加代码的质量，我们最好优先使用类型声明，这也比类型断言的 `as` 语法更加优雅。

#### 类型断言 vs 泛型

还是这个例子：

```ts
function getCacheData(key: string): any {
    return (window as any).cache[key];
}

interface Cat {
    name: string;
    run(): void;
}

const tom = getCacheData('tom') as Cat;
tom.run();
```

我们还有第三种方式可以解决这个问题，那就是泛型：

```ts
function getCacheData<T>(key: string): T {
  return (window as any).cache[key];
}
interface Cat {
  name: string;
  run(): void;
}
const tom = getCacheData<Cat>('tom');
tom.run();
```

通过给`getCacheData`函数添加一个泛型`<T>`，我们可以更加规范的实现对`getCacheData`返回值的约束，这也同时去除掉了代码中的`any`，是最优的一个解决方案。

