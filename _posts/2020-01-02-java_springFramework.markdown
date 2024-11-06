---
layout: post
title: Spring 기초
date: 2024-08-04 19:31:29 +0900
categories: java
---

> ## Spring 의 탄생

 Spring이 등장하기 전에 자바 개발자들은 EJB 를 주 프레임워크로 사용했습니다. <br>
 2002년도에 로드 존슨이 출판한 도서 "Expert One-on-One J2EE Design and Development"에 선보인 코드가 Spring의 근간이 되었습니다.<br>
 이 도서를 읽은 개발자들이 코드가 책으로만 존재하기에는 너무 아깝다며 로드 존슨의 허가를 받고 프레임워크로 발전시켰습니다.<br>
2003년 6월 Spring이 Apache 2.0 라이선스로 공개되었습니다. <br>
이때 당시 Spring의 가장 큰 장점은 생산성, 품질보증, 그리고 유지보수의 용이성이었습니다.<br>

> ## Spring Framework 의 특징

 * **경량 컨테이너**  <br>
 – Spring은 모든 객체의 생성, 소멸과 같은 라이프 사이클을 관리하며 Spring으로부터 필요한 객체를 얻어올 수 있습니다.
 * **POJO(Plan Old Java Object) 방식** <br>
  – POJO 란 무거운 객체가 아닌, 그냥 아무것도 안 붙인 자바 객체라고 해석할 수 있습니다. <br>
    간단하게 getter / setter를 생각하면 될 것 같습니다.
 * **IOC** <br>
 – Spring이 컨트롤권을 갖고 있어서 필요에 따라 Spring에서 사용자의 코드를 호출합니다.
 * **DI** <br>
 – 각각의 계층이나 서비스들 간에 의존성이 존재할 경우 프레임워크가 서로 연결시켜 줍니다.
 * **AOP** <br>
 – 트랜잭션, 로깅, 보안처럼 여러 모듈에서 공통적으로 사용되는 기능을 분리하여 관리할 수 있습니다.
 * **다양한 서비스 지원** <br>
 – iBatis, Hibernate 등 이미 완성도가 높은 데이터베이스 처리 라이브러리와 연결할 수 있는 인터페이스를 제공합니다.
  **확장성** <br>
 – Spring에서 통합하기 위해 기존 라이브러리를 간단하게 감싸는 정도로 Spring에서 사용이 가능하기 때문에 수많은 라이브러리가 지원되고, 별도로 분리하기도 용이합니다. 
  <br>
  <h4>이렇게 Spring Framework의 특징으로 잘 알려져 있는 내용들을 한번 봤습니다.<br>
  저도 근무할 때 사용하는 Spring Framework 지만 잘 모르기 때문에 좀 더 자세히 알아보려 합니다. </h4> 
  <br>

> ## DI(Dependency Injection)

  DI는 우리말로 의존성 주입 이라는 뜻입니다. <br>
  DI의 구현 방법에 크게 사용되는 3가지 방식에 대해서만 알아보겠습니다.

 1. **생성자 주입(Constructor Injection)**  <br>
   - 생성자 주입은 의존성 주입을 받을 객체를 클래스 생성자의 매개변수로 받는 방법입니다. <br>
     이 방법은 생성자를 통해 의존성을 주입받는 방식으로, 클래스 인스턴스를 생성할 때 의존성을 전달합니다.<br>
     코드가 간결해지고, 객체 생성 시점에 의존성을 모두 확인할 수 있어서 안정적인 코드를 작성할 수 있다.
 2. **Setter 주입(Setter Injection)** <br>
  - Setter 주입은 의존성 주입을 받을 객체를 클래스의 Setter 함수를 통해 주입하는 방법입니다. <br>
    생성자 주입과 유사하게, 세터 메소드를 통해 의존성을 주입받는 방식이며, 클래스 인스턴스 생성 후에 세터 메소드를 호출하여 의존성을 전달합니다.<br>
 3. **Interface 주입(Interface Injection)** <br>
  - Interface 주입은 자바(Java)나 C# 등의 언어에서 주로 사용됩니다. <br>
    객체가 인터페이스를 구현하는 경우 인터페이스를 통해 의존성을 주입하는 방법이라고 합니다.<br>
    DI 컨테이너가 객체에 대해 구현해야 할 인터페이스를 제공하고, 객체는 해당 인터페이스를 구현하는 방식으로 DI를 수행합니다.<br>


 > ## IoC (Inversion of Control)
  IOC에 대해 알기전에<a href="/java/2024/08/01/java_springBean.html">Spring Bean</a>에 대해 먼저 알아봐야 합니다. <br> 

  IoC는 제어 역전, 제어 반전, 역제어 등의 뜻을 가지고 있습니다. <br>
  IOC는 애플리케이션의 흐름을 개발자가 아닌 프레임워크가 제어를 담당하는 디자인 패턴입니다<br>
  전통적으로 프로그래밍에서 개발자가 직접적으로 라이브러리를 호출하여 흐름을 제어하거나, 객체의 생명주기를 관리해 왔습니다. <br>
  IOC에서는 저수준의 구성요소에 대한 통제를 상위 모듈에 위임하여 프레임워크에서 외부 라이브러리의 코드를 호출하거나, 객체의 생명주기를 제어하고,<br>
  언제 어떤 객체를 사용할 것인지의 의존성 관리를 프레임워크에게 결정할 수 있게 맡기는 것입니다. <br>

  * IOC를 적용하지 않은 코드
```ruby
public class TextEditor {

    private SpellChecker checker;

    public TextEditor() {
        this.checker = new SpellChecker();
    }
}
```
'TextEditor'는 'SpellChecker'에 의존하는 코드입니다. <br>
'TextEditor'는 'SpellChecker'를 직접 생성하고 관리도 해야 하므로 'SpellChecker'의 구현체가 변경되면 'TextEditor'도 변경해야 합니다.<br>
<br>

* IOC를 적용한 코드
```ruby
public class TextEditor {

    private SpellChecker checker;

    public TextEditor(SpellChecker checker) {
        this.checker = checker;
    }
}
```
'TextEditor'는 'SpellChecker'를 직접 생성하거나 관리하지 않습니다<br>
대신, 'TextEditor'의 생성자를 통해 'SpellChecker' 인스턴스가 주입되어 사용되는 코드입니다.<br>
이렇게 적용한 코드가 의존성 주입(DI)이며, IoC의 한 형태입니다.<br>

# IOC와 DI의 관계 
IoC는 제어권을 역전시켜서 프레임워크에게 프로그램의 제어를 맡기는 개념입니다.<br>
의존성 주입 DI는 IoC의 구성 방식 중 하나로 클래스의 의존성을 직접 코드 내에서 해결하는 대신 외부에서 주입하는 방식을 말합니다.<br>
스프링에서는 DI를 XML 설정, 어노테이션 등을 통해서 구현할 수 있습니다.<br>
<br>

> ## AOP (Aspect Oriented Programming)

AOP는 우리말로 관점 지향 프로그래밍이라고 말합니다.<br>
관점 지향은 어떤 로직을 기준으로 핵심적인 관점, 부가적인 관점으로 나누어서 보고 그 관점을 기준으로 **공통된 로직이나 기능을 하나로 묶는 것**을 하겠다는 것입니다.

* 그림으로 예시를 들자면

![AOP](/public/img/java/AOP.png) <br>

그림과 같이  A, B, C에서 공통적으로 나타나는 색깔 블록은 중복되는 메서드, 필드, 코드 등이다. 이때 예를 들어 클래스 A의 주황색 블록 부분을 수정해야 한다면 클래스 B, C의 주황색 부분도 일일이 찾아 수정해야 합니다.<br>
이는 SOLID원칙을 위배하며 유지보수를 어렵게 만듭니다. <br>
이런 식으로 소스 코드상에서 계속 반복해서 사용되는 부분들을 **흩어진 관심사(Crosscutting Concerns)**라고 합니다.<br>
<br>
결론은  AOP에서 각 관점을 기준으로 로직을 모듈화한다는 것은 **흩어진 관심사를 모듈화하겠다**는 의미입니다. <br>
그림과 같이 주황색,파란색,빨간색 블록처럼 모듈화를 시켜놓고 어디에 적용시킬지만 정의해주면 됩니다. <br>
이때 이 블록들을 **Aspect**라고 합니다.

---
## *참고
### 개발자가 직접 스프링 AOP API를 사용해서 AOP를 구현하는 경우는 많지 않으며,
### 일반적으로 XML 스키마를 이용하거나 @Aspect 어노테이션을 이용해서 AOP를 구현합니다.

  