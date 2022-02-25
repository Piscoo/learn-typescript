# TypeScript

## 基础类型

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

