# vars

DOCKER_NAMESPACE=addcodedp/isup
DOCKER_IMAGE=$(DOCKER_NAMESPACE):frontend-etp

# build

build-image:
	docker build -t $(DOCKER_IMAGE) .

# run

run-image:
	docker run -p 80:80 $(DOCKER_IMAGE)

# push

push-image:
	docker push $(DOCKER_IMAGE)
