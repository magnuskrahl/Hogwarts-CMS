# Pseudokode for endpoints

### GET Houses, Teachers, Students

```
getAll():
    Returner alle entries ELLER fejl fra Database
```

```
All = Return af getAll()
Hvis ingen fejl, så:
    Set status til 200 (OK!), send All som response
    Print All på terminal
Hvis fejl:
    Set status til 500 (Server error!), send generisk fejlbesked som response
    Print fejl i terminalen
```

### GET Houses:id, Teachers:id, Students:id

```
getOne(id):
    Returner alle entries med parameter (ID efter slash af det requestede endpoint) ELLER fejl fra Database
```

```
One = Return af getOne()
Hvis ingen fejl, så:
    Hvis længden af rows af One er 0:
        Set status til 404 (Ingen entries med det ID som er givet som parameter i query!), send generisk 404 fejlbesked
        Log 404 fejl i terminalen
        Returner
    Set status til 200 (OK!), send One som response
    Print One på terminal
Hvis fejl:
    Set status til 500 (Server error!), send generisk fejlbesked som response
    Print fejl i terminalen
```

### POST Teachers

```
postTeacher():
    Hent name fra request body
    Hent house fra request body ELLER sæt house til 0
    Returner en ny teacher med name og house ELLER fejl fra Database
```

```
Created = Return af postTeacher()
Hvis ingen fejl, så:
    Print besked med teacherens name og ID på terminalen
    Print Created på terminalen
    Set status til 201 (Created!), send Created som response
Hvis fejl:
    Set status til 500 (Server error!), send generisk fejlbesked som response
    Print fejl i terminalen
```

### POST Students

```
postStudent():
    Hent name fra request body
    Hent house fra request body ELLER sæt house til 0
    Hent semester fra request body ELLER sæt semester til 0
    Returner en ny student med name, house og semester ELLER fejl fra Database
```

```
Created = Return af postStudent()
Hvis ingen fejl, så:
    Print besked med studentens name og ID på terminalen
    Print Created på terminalen
    Set status til 201 (Created!), send Created som response
Hvis fejl:
    Set status til 500 (Server error!), send generisk fejlbesked som response
    Print fejl i terminalen
```

### POST Courses

```
postCourse():
    Hent name fra request body
    Hent teacher fra request body
    Hent students fra request body ELLER sæt students til et tomt array
    Opret en ny course med name, teacher og students ELLER fejl fra Database
    Lav et print-array med det nye course-ID og data fra request body
```

```
Created = Return af postCourse()
Hvis ingen fejl, så:
    Print besked med coursens name og ID på terminalen
    Print print-arrayet på terminalen
    Set status til 201 (Created!), send print-arrayet som response
Hvis fejl:
    Set status til 500 (Server error!), send generisk fejlbesked som response
    Print fejl i terminalen
```

### PATCH Teachers:id, Students:id

```
patchTeacher(id) ELLER patchStudent(id):
    Hent ID fra parameteren efter slash af det requestede endpoint
    Hent de mulige felter fra request body
    Lav en liste med de felter som skal opdateres
    Opdater entry med de felter som er sendt ELLER fejl fra Database
```

```
Updated = Return af patchTeacher() ELLER patchStudent()
Hvis ingen felter skal opdateres:
    Set status til 400 (Ingen felter at opdatere!), send fejlbesked som response
Hvis Updated ikke indeholder nogen rows:
    Print 404 fejl i terminalen
    Set status til 404 (Ingen entries med det ID som er givet som parameter!), send fejlbesked som response
    Returner
Hvis ingen fejl:
    Print besked med entryens ID på terminalen
    Set status til 200 (OK!), send Updated som response
Hvis fejl:
    Set status til 500 (Server error!), send generisk fejlbesked som response
    Print fejl i terminalen
```

### PATCH Courses:id

```
TODO
```

### DELETE Teachers:id, Students:id

```
deleteOneTeacher(id) ELLER deleteOneStudent(id):
    Hent ID fra parameteren efter slash af det requestede endpoint
    Slet entryen med det givne ID ELLER fejl fra Database
```

```
Deleted = Return af deleteOneTeacher() ELLER deleteOneStudent()
Hvis Deleted ikke indeholder nogen rows:
    Print 404 fejl i terminalen
    Set status til 404 (Ingen entries med det ID som er givet som parameter!), send fejlbesked som response
    Returner
Hvis ingen fejl:
    Print besked med entryens ID på terminalen
    Set status til 200 (OK!), send Deleted som response
Hvis fejl:
    Set status til 500 (Server error!), send generisk fejlbesked som response
    Print fejl i terminalen
```

### GET Courses

```
getAllCourses():
    Returner alle courses med deres teacher og student IDs samlet i et array ELLER fejl fra Database
```

```
All = Return af getAllCourses()
Hvis ingen fejl, så:
    Set status til 200 (OK!), send All som response
    Print All på terminalen
Hvis fejl:
    Set status til 500 (Server error!), send generisk fejlbesked som response
    Print fejl i terminalen
```

### GET Courses:id

```
getOneCourse(id):
    Returner course med det givne ID, teacher og student IDs samlet i et array ELLER fejl fra Database
```

```
Course = Return af getOneCourse()
Hvis ingen fejl, så:
    Hvis længden af rows af Course er 0:
        Set status til 404 (Ingen courses med det ID som er givet som parameter!), send generisk 404 fejlbesked
        Log 404 fejl i terminalen
        Returner
    Set status til 200 (OK!), send Course som response
    Print Course på terminalen
Hvis fejl:
    Set status til 500 (Server error!), send generisk fejlbesked som response
    Print fejl i terminalen
```

### GET Root

Dette endpoint (Roden, /) er ikke en del opgaven, men tænkte det ville være godt at have som en bonus, så de forskellige endpoints kunne forklares. Kunne være at denne rute skulle slettes.

```
getRoot():
    Hent det aktuelle tidspunkt fra Database
    Lav en besked med nogle af API'ets endpoints
    Returner connected, currentTime og beskeden ELLER fejl fra Database
```

```
One = Return af getRoot()
Hvis ingen fejl, så:
    Set connected til true
    Set status til 200 (OK!), send currentTime og beskeden som response
    Print database connected på terminalen
Hvis fejl:
    Print fejl i terminalen
    Set connected til false
    Set status til 503 (Service unavailable!), send generisk fejlbesked som response
```
