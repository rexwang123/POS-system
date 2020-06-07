from rest_framework import routers
from .api import GoodsViewSet

router = routers.DefaultRouter()
router.register('api/goods',GoodsViewSet,'goods')

urlpatterns = router.urls