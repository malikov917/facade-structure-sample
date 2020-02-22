# facade-structure-sample

Пререквезиты: 
Знание observable, subject, service facade api state, asynchronous code, state approach, unidirectional data flow, facade pattern, dumb components, file structure

Почему reactive state management?
## Check out Slides:
### https://slides.com/kostyamalikov/raw-reactive-architecture#/

Ссылки:
https://angular-academy.com/angular-architecture-best-practices/ // !!! Самая главная ссылка

https://slides.com/kostyamalikov/raw-reactive-architecture
https://www.youtube.com/watch?v=xLTIDs0CDCM
https://dzone.com/articles/state-management-using-ngxs-in-angular
https://www.ngxs.io/concepts/state#async-actions
https://www.daptontechnologies.com/angular-ngxs-crud/
https://stackblitz.com/edit/ngxs-todos-simple
ngxs.io/v/master/concepts/state
https://www.ngxs.io/v/master/advanced/actions-life-cycle - продвинутая дока, позволяет постичь глубины реактивного подхода


Важность стейт менеджмента
Пример своей реализации
В чем проблема js стейта? Нет контроля нал данными. Тебе приходится все сетить явно и порой эти данные лежат в сервисах, порой в одном компоненте. Порой в паренте, а изменяется в чайлде. Все это не покрыто никакими типами, логами, неупорядоченно и ты всегда тратишь время на то, чтобы придумать, где же все-таки хранить логику изменения данных.   
Сэмпл приложения на фасадах

Концепция: (фасад)
Есть фасад. В нем апи и стор.
Есть стор. В нем лежит Стейт и положить / взять из стейта.
Есть апи. В нем лежат апи запросы.
https://slides.com/kostyamalikov/raw-reactive-architecture#/



NGRX VS NGXS. Изображение объясняющее флоу NgRx 
￼￼![NGRX](https://ngrx.io/generated/images/guide/store/state-management-lifecycle.png)

Флоу, описывающий NGXS

￼￼![NGXS](https://i0.wp.com/blog.knoldus.com/wp-content/uploads/2019/06/flow-ngxs.png?w=810&ssl=1)

￼
NGRX VS NGXS -> NGXS

There are four major concepts in NGXS:
1. Store: The store is a global state manager that dispatches actions your state containers listen to and provides a way to select data slices out from the global state.
2. Actions: Actions describe unique events that are dispatched from components and services. Each action contains a type field which is their unique identifier and payload required for that action.
3. State: Class definition of the state. State changes are handled by pure functions also called reducers that take the current state and the latest action to compute a new state.
4. Selects: Selectors are pure functions used to select, derive and compose pieces of state.

￼
