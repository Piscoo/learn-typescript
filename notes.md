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

```typescript
let isDone: boolean = false;
```

注意，使用构造函数`Boolean`创造的对象不是布尔值：

```typescript
let createdByNewBoolean: boolean = new Boolean(1);
// Type 'Boolean' is not assignable to type 'boolean'
// 'boolean' is a primitive, but 'Boolean' is a wrapper object. Prefer using 'boolean' when poosible.
```

事实上，`new Boolean()`返回的是一个`Boolean`对象；

```typescript
let createdByNewBoolean: Boolean = new Boolean(1);
```

直接调用`Boolean`也可以返回一个`boolean`类型：

```typescript
let createdByBoolean: boolean = Boolean(1);
```

在TypeScript中，`boolean`是JavaScript中的基本类型，而`Boolean`是JavaScript中的构造函数。其他基本类型（除了`null`和`undefined`）一样。

#### 数值

使用`number`定义数值类型：

```typescript
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

```typescript
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

```typescript
let myName: string = 'Pisco';
let myAge: number = 25;
// 模版字符串
let sentence: string = `Hello, my name is ${myName}. I'll be ${myAge + 1} years old next month.`;
```

编译结果：

```typescript
var myName = 'Pisco';
var myAge = 25;
// 模版字符串
var sentence = "Hello, my name is " + myName + ". I'll be" + (myAge + 1) + " years old next month.";
```

#### 空值

JavaScript没有空值(Void)的概念，在TypeScript中，可以用`void`来表示没有任何返回值的函数：

```typescript
function alertName(): void {
  alert('My name is Pisco');
}
```

声明一个`void`类型的变量没什么用，因为你只能将它赋值为`undefined`和`null`：

```typescript
let unusable: void = null;
```

#### Null 和 Undefined

在TypeScript中，可以使用`null`和`undefined`来定义这两个原始数据类型：

```typescript
let u: undefined = undefined;
let n: null = null;
```

与`void`的区别是，`undefined`和`null`是所有类型的子类型。也就是说`undefined`类型的变量，可以赋值给`number`类型的变量：

```typescript
//这样不会报错
let num: number = undefined;
// 这样也不会报错
let u: undefined;
let num1: number = u;
```

而`void`类型的变量不能赋值给`number`类型的变量：

```typescript
let u: void;
let num: number = u;
// Type 'void' is not assignable to type 'number'.
```

### 任意值

任意值(Any)用来表示允许赋值为任意类型。

#### 什么事任意值类型

如果一个普通类型，在赋值过程中改变类型是不被允许的：

```typescript
let myNumber: string = 'eight';
myNumber = 8;
//  index.ts(2,1): error TS2322: Type 'number' is not assignable to type 'string'.
```

但如果是`any`类型，则允许被赋值为任意类型。

```typescript
let myNumber: any = 'eight';
myNumber = 8;
```

#### 任意值的属性和方法

在任意值上访问任何属性都是允许的：

```typescript
let anyThing: any = 'hello';
console.log(anyThing.myName);
console.log(anyThing.myName.firstName);
```

也允许调用任意方法：

```typescript
let anyThing: any = 'Pisco';
anyThing.setName('Smith');
anyThing.setName('Smith').sayHello();
anyThing.myName.setFirstName('Pisco')
```

可以认为，声明一个变量为任意值之后，对它的任何操作，返回的内容的类型都是任意值。

#### 未声明类型的变量

变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型：

```typescript
let something;
something = 'seven';
something = 7;
something.setName("Pisco");
```

等价于：

```typescript
let something: any;
something = 'seven';
something = 7;
something.setName('Pisco');
```

### 类型推论

如果没有明确的指定类型，那么TypeScript会依照类型推论(Type Inference)的规则推断出一个类型。

#### 什么是类型推论

以下代码虽然没有指定类型，但是会在编译的时候报错：

```typescript
let myNumber = 'eight';
myNumber = 8;
// index.ts(2,1): error TS2322: Type 'number' is not assignable to type 'string'.
```

事实上，它等价于：

```typescript
let myNumber: string = 'eight';
myNumber = 8;
// index.ts(2,1): error TS2322: Type 'number' is not assignable to type 'string'.
```

TypeScript会在没有明确的指定类型的时候推测出一个类型，这就是类型推论。

如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成`any`类型而完全不被类型检查：

```typescript
let something;
something = 'seven';
something = 7;
```

### 联合类型

联合类型(Union Types)表示取值可以为多种类型中的一种。

```typescript
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

```typescript
function getLength(something: string | number): number {
  return something.length;
}
// index.ts(2,22): error TS2339: Property 'length' does not exist on type 'string | number'.
//   Property 'length' does not exist on type 'number'.
```

上例中，`length`不是`string`和`number`的共有属性，所以会报错。

访问`string`和`number`的共有属性是没问题的：

```typescript
function getString(something: string | number): string {
  return something.toString();
}
```

联合类型的变量在被赋值的时候，会根据类型推论的规则推断出一个类型：

```typescript
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

```typescript
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

```typescript
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

```typescript
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

```typescript
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

```typescript
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

```typescript
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

```typescript
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

````typescript
let fibonacci: number[] = [1, '2', 3, 4];
// Type 'string' is not assignable to type 'number'.
````

数组的一些方法的参数也会根据数组在定义时约定的类型进行限制：

```typescript
let fibonacci: number[] = [1, 2, 3];
fibonacci.push('8');
// Argument of type '"8"' is not assignable to parameter of type 'number'.
```

#### 数组泛型

我们也可以使用数组泛型(Array Generic) `Array<elemType>`来表示数组：

`let fibonacci: Array<number> = [1, 2, 3, 4];`

#### 用接口表示数组

接口也可以用来描述数组

```typescript
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

```typescript
function sum() {
  let args: number[] = arguments;
}
// Type 'IArguments' is missing the following properties from type 'number[]': pop, push, concat, join, and 24 more.
```

上例中，`arguments`实际上是一个类数组，不能用普通的数组方式来描述，而应该用接口：

```typescript
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

```typescript
function sum() {
  let args: IArguments = arguments;
}
```

其中`IArguments`是TypeScript中定义好了的类型，它实际上就是;

```typescript
interface IArgumets {
  [index: number]: any;
  length: number;
  callee: Function;
}
```

#### any 在数组中的应用

一个比较常见的做法是，用`any`表示数组中允许出现任意类型：

`let list: any[] = ['Pisco', 25, {sport: 'basketball'}];`

