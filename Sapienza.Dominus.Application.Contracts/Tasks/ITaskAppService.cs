using System;
using System.Threading.Tasks;
using Sapienza.Dominus.Tasks.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace Sapienza.Dominus.Tasks;

public interface ITaskAppService :
    ICrudAppService<
        TaskDto,
        Guid,
        TaskGetListInput,
        CreateUpdateTaskDto,
        CreateUpdateTaskDto>
{
    System.Threading.Tasks.Task<ListResultDto<LookupDto<Guid>>> GetTaskLookupAsync();
}

public class LookupDto<TKey>
{
    public TKey Id { get; set; }
    public string DisplayName { get; set; }
}
