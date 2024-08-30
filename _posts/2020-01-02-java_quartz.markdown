---
layout: post
title: java Quartz 스케줄러 적용해보기
date: 2024-02-04 19:31:29 +0900
categories: java
---
> ## java Quartz Scheduler

오늘 내가 하는 프로젝트에서 가입한지 6개월이 지난 비회원들의 전화번호를 삭제 해달라는 요청이 왔다 <br>
Quartz Scheduler 를 이용해 한번 적용해보자

> ## Quartz 란
* Quartz는 다중 Thread Architecture기반으로 Thread 환경 관리를 위해 ThreadPool 에 의존한다.
* 주요 Interface 에는
1. **Scheduler** – scheduler 와 상호작용하는 기본 API
2. **Job** – 실제 작업을 수행하는 개체
3. **JobDetail** – Job instances 정의에 사용
4. **Trigger** – 주어진 작업(Job)이 수행될 조건 결정 (특정시간, 횟수, 반복주기 등)
5. **JobBuilder** – Job의 instances 정의하는 JobDetail instances 빌드에 사용
6. **TriggerBuilder** – Trigger instances 빌드에 사용

> ## Dependency
[쿼츠를 사용하기 위해 Dependency]("https://central.sonatype.com/")를 가져와서 적용해보자 <br>

```
    <dependency>
        <groupId>org.quartz-scheduler</groupId>
        <artifactId>quartz</artifactId>
        <version>2.1.7</version>
        <exclusions>
            <exclusion>
                <artifactId>slf4j-api</artifactId>
                <groupId>org.slf4j</groupId>
            </exclusion>
        </exclusions>
    </dependency>
    <dependency>
        <groupId>org.quartz-scheduler</groupId>
        <artifactId>quartz-jobs</artifactId>
        <version>2.2.1</version>
    </dependency>
```

**xml**에 적용
```ruby
	<bean id="deleteOldMembersJob" class="org.springframework.scheduling.quartz.MethodInvokingJobDetailFactoryBean">
		<property name="targetObject" ref="memberService" />
		<property name="targetMethod" value="deleteOldMembers" />
		<property name="concurrent" value="false" />
	</bean>

    <bean id="deleteOldMembersTrigger" class="org.springframework.scheduling.quartz.CronTriggerFactoryBean">
		<property name="jobDetail" ref="deleteOldMembersJob" />
		<property name="cronExpression" value="0 0 0 * * ?" />
	</bean>
```

```
bean id="deleteOldMembersTrigger" 
```
: 코드를 하나씩 보자면 빈의 ID입니다. 다른 빈에서 참조할 때 사용됩니다.

```
property name="targetObject" ref="memberService"
```
:여기서는 memberService 라는 빈을 참조하고 있습니다.


```
property name="targetMethod" value="deleteOldMembers"
```
: 실행할 메서드의 이름을 지정합니다. memberService 객체의 deleteOldMembers 메서드를 실행하게 됩니다.

```
property name="concurrent" value="false"
```
: 이 속성은 이 작업이 동시에 여러 번 실행되지 않도록 설정합니다. false로 설정하면 이전 작업이 완료되기 전까지 새로운 작업이 실행되지 않습니다.


```
<bean id="deleteOldMembersTrigger"
```
: 이 빈의 ID입니다. 이 트리거(Trigger)는 특정 작업이 실행되는 시간과 빈도를 정의합니다.

```
class="org.springframework.scheduling.quartz.CronTriggerFactoryBean"
```
: 이 클래스는 Quartz CronTrigger 객체를 생성하는 데 사용됩니다. CronTrigger는 주기적으로 작업을 실행할 때 사용됩니다.

```
property name="jobDetail" ref="deleteOldMembersJob"
```
: 이 속성은 어떤 JobDetail(작업 세부 사항)을 트리거할지 설정합니다. 여기서는 deleteOldMembersJob이라는 이전에 정의한 JobDetail을 참조합니다.

```
property name="cronExpression" value="0 0 0 * * ?"
```
: 이 속성은 Cron 표현식으로 작업이 실행될 시각을 지정합니다. 0 0 0 * * ?는 매일 자정(오전 12:00)에 작업이 실행되도록 설정합니다.


># UserScheduling.java

```ruby
package egovframework.module.uat.uia.service;

import egovframework.module.ordr.ordr.service.OrdrManageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service("memberService")
public class UserScheduling {

  @Resource(name = "ordrManageService")
  private OrdrManageService ordrManageService;

  private static final Logger LOGGER = LoggerFactory.getLogger(OrdrManageService.class);

  public void deleteOldMembers() throws Exception {
    try {
      ordrManageService.deleteOldMember();

    } catch (Exception e) {
      LOGGER.error("MemBer Scheduler ERROR"+e.getMessage());
    }

  }

}
```
># SQL

```
    <update id="deleteOldMember">
		UPDATE comtnordr
		SET ORDR_RQSTR_TELNO = NULL
		,CREDT_ID = NULL
		WHERE FRST_REGISTER_PNTTM <![CDATA[<]]> DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 6 MONTH), '%Y%m%d');
	</update>
```

* 이러면 매일 오전 12시:00분 마다 deleteOldMembers 메서드가 실행되어 comtnordr 테이블에 있는
ORDR_RQSTR_TELNO(전화번호), CREDT_ID (신용정보키) 가 삭제 될 것입니다.

---
## 실제로 실행해 봅시다.
테스트를 하기 위해 기존 12시00분 마다 되던걸 매 1초마다 되게 변경해 봅니다.
```
기존 오전 12시 00분 마다
<property name="cronExpression" value="0 0 0 * * ?" />
변경 매 1초마다
<property name="cronExpression" value="* * * * * ?" />
```

그리고 UserScheduling.java에 deleteOldMember 메서드도 주석처리 한후 test를 찍어봅시다.
```
 public void deleteOldMembers() throws Exception {
    try {
      LOGGER.info("test");
      /*ordrManageService.deleteOldMember();*/

    } catch (Exception e) {
      LOGGER.error("MemBer Scheduler ERROR"+e.getMessage());
    }

  }
  ```

## 실행결과 
**매 1초마다 "test" 가 찍히는 걸 보아하니 스케줄러가 잘 적용 됬습니다.** <br>
![테스트실행](/public/img/quartz/테스트실행.png) <br>

  