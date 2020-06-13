from django.db import models

# Create your models here.
class Customer(models.Model):
    lastName = models.CharField(max_length=100)
    firstName = models.CharField(max_length=100)
    email = models.EmailField(max_length=500, blank=True, null=True)
    number = models.PositiveIntegerField(primary_key=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __unicode__(self):
        return '%s,%s,%s,%s'%(self.lastName,self.firstName,self.email,self.number)