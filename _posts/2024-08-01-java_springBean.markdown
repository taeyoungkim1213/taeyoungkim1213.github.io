---
layout: post
title: Spring Bean
date: 2024-08-01 19:31:29 +0900
categories: java
---
> ## 스프링 빈(Bean) 이란?

![Spring](/public/img/java/Spring.png) <br>

**빈(Bean)**은 스프링 컨테이너에 의해 관리되는 재사용 가능한 소프트웨어 컴포넌트입니다. <br>
즉, 스프링 컨테이너가 관리하는 자바 객체를 뜻하며, 하나 이상의 **빈(Bean)**을 관리합니다.<br>
<br>
빈은 인스턴스화된 객체를 의미하며, 스프링 컨테이너에 등록된 객체를 스프링 빈이라고 합니다. 

쉽게 이해하자면 new 키워드 대신 사용한다고 보면됩니다.

**ex)**

```ruby

<bean id="testService" class="com.example.myapp.di.TestService"/>

ITestService testService = new ITestService()

```

ITestService 라는 인터페이스가 존재하고 testService 인스턴스를 만들기 위해서는 new 라는 키워드를 사용해 인스턴스를 생성했습니다.

스프링 컨테이너가 관리하도록 하는 방법은 빈 태그를 사용하면 됩니다.

이렇게 xml 파일 빈 태그를 추가하면 testService 인스턴스를 스프링 컨테이너가 관리하게 됩니다.
<br>
<br>
> ##  스프링 빈(Bean) 사용이유 ❓

 - 가장 큰 이유는 스프링 간 객체가 의존관계를 관리하도록 하는 것에 가장 큰 목적이 있습니다.
 
   객체가 의존관계를 등록할 때 스프링 컨테이너에서 해당하는 빈을 찾고, 그 빈과 의존성을 만듭니다.



> ## 스프링 빈(Bean) 등록 방법

  **Spring Bean을 등록하는 방법은 대표적으로 3가지 정도가 있다.**
  - xml에 직접 등록
  - @Bean 어노테이션을 이용
  - @Component, @Controller, @Service, @Repository 어노테이션을 이용

  <br>

  - **xml에 직접 등록**  

    < bean > 태그를 사용하는 것입니다.
    
    ```ruby

    <bean id="testService" class="com.example.myapp.di.TestService"/>

    <bean id="testController" class="com.example.myapp.di.TestController" p:testService-ref="testService">		
    </bean>

    ```

    application-config.xml 을 resource 아래에 만들어 준다. 그리고 **< beans >** 태그 안에 **< bean >**을 만들어 줍니다.
    
    위의 코드는 의존성 주입까지 한 코드입니다.
    
    <br>

  
  - **@Bean 어노테이션을 이용** 

  ```ruby

    @Configurable
  @ComponentScan(basePackages= {"com.example.myapp"})
  @ImportResource(value= {"classpath:application-config.xml"})
  public class AppConfig {
      @Bean
      public ITestService testService() {
        return new TestService();
      }
      
      @Bean
      public TestController testController() {
        TestController controller = new TestController();
        controller.setTestService(testService());
        return controller;
      }
  }

  ```

  위 코드는 인스턴스를 반환하고 빈에 등록하는 코드입니다.

  메서드 위에 **@Bean**태그를 사용하고 AppConfig 객체 위에 **@Configurable, @ComponentScan, @ImportResource** 어노테이션을 선언해줍니다. 

  *** 어노테이션을 사용하기 위해 꼭 application-xml에서 context를 추가해주는 것을 까먹지 말아햐합니다.**

  ```ruby
  
    public class TestMain {

    public static void main(String[] args) {
      AbstractApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class); 

      System.out.println("-----------------------");
      TestController controller = context.getBean("testController", TestController.class);
      controller.test("김태영");
      System.out.println("=====================");
      context.close();
      }
  }

  ```

  그리고 메인에서 Annotation을 사용하기 위해 AnnotationConfigApplicationContext 를 사용했습니다.

  <br>


  
  - **@Component, @Controller, @Service, @Repository 어노테이션을 이용**

  ```ruby

  <?xml version="1.0" encoding="UTF-8"?>
  <beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:context="http://www.springframework.org/schema/context"
    xmlns:p="http://www.springframework.org/schema/p"
    xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
      http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context-3.1.xsd">
    
    <context:component-scan base-package="com.example.myapp.hr"/>

  </beans>

  ```

  application-config.xml 파일

  여기서 namespace에서 context 추가하고 아래에 context를 추가해줍니다.

  ```ruby

    @Controller
  public class EmpController {
    
    private IEmpService empService;
    
    @Autowired
    public EmpController(IEmpService empService) {
      this.empService = empService;
    }
    
    void printInfo() {
      int count = empService.getEmpCount(50);
      System.out.println("사원의 수 : " + count);
    }
  }

  ```

  **@Controller**와 **@Autowired**를 이용해 의존성 주입까지 한 코드입니다.
  
  <br>

  ---

  

