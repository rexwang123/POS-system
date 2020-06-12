from rest_framework import routers
from .api import SectionViewSet

router = routers.DefaultRouter()
router.register('api/sections',SectionViewSet,'sections')

urlpatterns = router.urls