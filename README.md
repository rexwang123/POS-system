# POS-system
# install Django 
pip install django djangorestframework django-rest-knox

# install packages which help usage of react in Django
npm install -D webpack webpack-cli 
npm install -D @babel/core babel-loader @babel/preset-env @babel/preset-react babel-plugin-transform-class-properties

# install react and used packages
npm install react react-dom prop-types
npm install axios bootstrap css-loader style-loader url-loader file-loader react-select react react-alert react-alert-template-basic react-bootstrap redux react-redux redux-thunk redux-devtools-extension react-router react-router-dom react-transition-group 


# Launch this app

>    cd POS_system 
<br>
>    python manage.py runserver 
<br>
Open a new browser, and go to http://127.0.0.1:8000/ 



# After making modifications of codes
Run "npm run dev” if you make any changes in frontend/src/components/*, this is used to compile the JS codes for React part, otherwise it will not be compiled and the changes will not be applied

# Clear database
in the POS_system/POS_system directory
<br>
  rm db.sqlite
<br>
  python manage.py migrate

# After making modifications of models, make them reflected in the database
in the POS_system/POS_system directory 
<br>
  rm customers/migrations/\*_initial.py orders/migrations/\*_initial.py carts/migrations/\*_initial.py goods/migrations/\*_initial.py sections/migrations/\*_initial.py entries/migrations/\*_initial.py
<br>
  python manage.py makemigrations customers orders carts goods sections entries
<br> 
  python manage.py migrate
